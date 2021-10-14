#!/usr/bin/env node

import path from 'path'
import { promises as fs } from 'fs'
import { setFailed, getInput, info } from '@actions/core'

import { findInvalidWrapperJars } from './validate'
import { Command, Option } from 'commander'
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
      minWrapperCount = +getInput('min-wrapper-count')
      allowSnapshots = getInput('allow-snapshots')
      allowChecksums = getInput('allow-checksums')

    } else {
      const program = new Command()
      // const actionYaml = jsyaml.load(await fs.readFile(path.resolve('action.yml'), 'utf8')) as Action
      const actionYaml = jsyaml.load(await fs.readFile(path.join(_dirname,'action.yml'), 'utf8')) as Action

      program
        .description(actionYaml.description)

      Object.entries(actionYaml.inputs).forEach(([key, value]) => {
        program.addOption(
          new Option(`--${key} <value>`, value.description)
            .default(value.default)
            .env(key.toLocaleUpperCase().replace(/-/g, '_')))
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
      allowChecksums.split(',')
    )
    if (result.isValid()) {
      info(result.toDisplayString())
    } else {
      setFailed(
        `Gradle Wrapper Validation Failed!\n  See https://github.com/gradle/wrapper-validation-action#reporting-failures\n${result.toDisplayString()}`
      )
    }
  } catch (error) {
    if (error instanceof Error)
      setFailed(error.message)
  }
}

run()
