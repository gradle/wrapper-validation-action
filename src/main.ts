#!/usr/bin/env node

import * as path from 'path'
import * as core from '@actions/core'

import * as validate from './validate'
import { Command } from 'commander';

export async function run(): Promise<void> {
  try {
    var minWrapperCount
    var allowSnapshots
    var allowChecksums
    if(process.env.GITHUB_ACTION) {
      minWrapperCount = +core.getInput('min-wrapper-count')
      allowSnapshots = core.getInput('allow-snapshots')
      allowChecksums = core.getInput('allow-checksums')
    } else {
      const program = new Command()
      program
        .description("Gradle Wrapper Validation")
        .option('-m, --min-wrapper-count <number>', 'Minimum expected wrapper JAR files', '1')
        .option('-s, --allow-snapshots <boolean>', 'Allow snapshot Gradle versions', 'false')
        .option('-c, --allow-checksums [checksums...]', 'Allow arbitrary checksums, comma separated', '')
        
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
