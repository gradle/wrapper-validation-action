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
      const list = invalidWrapperJars.map(
        invalid => `${invalid.checksum} ${invalid.path}`
      )
      core.setFailed(
        `Found unknown Gradle Wrapper JAR files\n${list.join('\n- ')}`
      )
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
