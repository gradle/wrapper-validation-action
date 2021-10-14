#!/usr/bin/env node

import * as path from 'path'
import * as fs from 'fs'
import * as core from '@actions/core'

import * as validate from './validate'
import { Command } from 'commander'
import * as jsyaml from 'js-yaml'

export async function run(): Promise<void> {
  try {
    let minWrapperCount
    let allowSnapshots
    let allowChecksums
    if (process.env.GITHUB_ACTION) {
      minWrapperCount = +core.getInput('min-wrapper-count')
      allowSnapshots = core.getInput('allow-snapshots')
      allowChecksums = core.getInput('allow-checksums')
    } else {
      const program = new Command()
      const actionYaml: Action = jsyaml.load(await fs.promises.readFile(path.resolve('action.yml'), 'utf8')) as Action

      program
        .description(actionYaml.description)

      for (const [key, value] of Object.entries(actionYaml.inputs)) {
        program.option('--' + key + ' <value>', value.description, value.default)
      }

      program.parse(process.argv)
      const options = program.opts()
      minWrapperCount = +options.minWrapperCount
      allowSnapshots = options.allowSnapshots
      allowChecksums = options.allowChecksums
    }

    const result = await validate.findInvalidWrapperJars(
      path.resolve('.'),
      minWrapperCount,
      allowSnapshots === 'true',
      allowChecksums.split(',')
    )
    if (result.isValid()) {
      core.info(result.toDisplayString())
    } else {
      core.setFailed(
        `Gradle Wrapper Validation Failed!\n  See https://github.com/gradle/wrapper-validation-action#reporting-failures\n${result.toDisplayString()}`
      )
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

interface Action {
  name: string;
  description: string;
  author: string;
  inputs: Map<string, Input>;
}

interface Input {
  description: string;
  required?: boolean;
  default?: string; 
}