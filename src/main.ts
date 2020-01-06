import * as path from 'path'
import * as core from '@actions/core'

import * as validate from './validate'

export async function run(): Promise<void> {
  try {
    const allowSnapshots = core.getInput('allow-snapshots') === 'true'
    const allowChecksums = core.getInput('allow-checksums').split(',')
    const invalidWrapperJars = await validate.findInvalidWrapperJars(
      path.resolve('.'),
      allowSnapshots,
      allowChecksums
    )
    if (invalidWrapperJars.length > 0) {
      core.setFailed(`Invalid wrapper jars ${invalidWrapperJars}`)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
