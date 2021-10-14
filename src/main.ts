#!/usr/bin/env node

import path from 'path'
import { promises as fs } from 'fs'
import core from '@actions/core'

import { findInvalidWrapperJars } from './validate'
import { Command } from 'commander'
import jsyaml from 'js-yaml'

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

export async function run(): Promise<void> {
  try {
    let minWrapperCount: number
    let allowSnapshots: string
    let allowChecksums: string
    
    if (process.env.GITHUB_ACTION) {
      minWrapperCount = +core.getInput('min-wrapper-count')
      allowSnapshots = core.getInput('allow-snapshots')
      allowChecksums = core.getInput('allow-checksums')

    } else {
      const program = new Command()
      const actionYaml = jsyaml.load(await fs.readFile(path.resolve('action.yml'), 'utf8')) as Action

      program
        .description(actionYaml.description)
        .name('wrapper-validation')
      
      Object.entries(actionYaml.inputs).forEach(([key,value]) => {
          program.option(`--${key} <value>`, value.description, value.default)
      })

      program.parse(process.argv)
      const options = program.opts()
      minWrapperCount = +options.minWrapperCount
      allowSnapshots = options.allowSnapshots
      allowChecksums = options.allowChecksums
    }

    const result = await findInvalidWrapperJars(
      path.resolve('.'),
      minWrapperCount,
      allowSnapshots === 'true',
      // --allow-snapshots , --allow-snapshots false/true
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
    if(error instanceof Error)
      core.setFailed(error.message)
  }
}

run()
