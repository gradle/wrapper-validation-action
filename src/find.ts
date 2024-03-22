import * as util from 'util'
import * as path from 'path'
import * as fs from 'fs'
import * as readline from 'readline'
import unhomoglyph from 'unhomoglyph'
import * as core from '@actions/core'
import events from 'events'

const readdir = util.promisify(fs.readdir)
const versionRegex = new RegExp(/\/gradle-(.+)-/)

export async function findWrapperJars(baseDir: string): Promise<string[]> {
  const files = await recursivelyListFiles(baseDir)
  return files
    .filter(file => unhomoglyph(file).endsWith('gradle-wrapper.jar'))
    .map(wrapperJar => path.relative(baseDir, wrapperJar))
    .sort((a, b) => a.localeCompare(b))
}

export async function detectVersions(wrapperJars: string[]): Promise<string[]> {
  return (
    await Promise.all(
      wrapperJars.map(async wrapperJar => await findWrapperVersion(wrapperJar))
    )
  ).filter(version => version !== undefined) as string[]
}

async function findWrapperVersion(
  wrapperJar: string
): Promise<string | undefined> {
  const jar = path.parse(wrapperJar)
  const properties = path.resolve(jar.dir, 'gradle-wrapper.properties')

  if (fs.existsSync(properties)) {
    try {
      const lineReader = readline.createInterface({
        input: fs.createReadStream(properties)
      })

      let distributionUrl = ''
      lineReader.on('line', function (line) {
        if (line.startsWith('distributionUrl=')) {
          distributionUrl = line
          lineReader.close()
        }
      })

      await events.once(lineReader, 'close')

      if (distributionUrl) {
        const matchedVersion = distributionUrl.match(versionRegex)
        if (matchedVersion && matchedVersion.length >= 1) {
          return matchedVersion[1]
        } else {
          core.debug(
            `Could not parse version from distributionUrl in gradle-wrapper.properties file: ${properties}`
          )
        }
      } else {
        core.debug(
          `Could not identify valid distributionUrl in gradle-wrapper.properties file: ${properties}`
        )
      }
    } catch (error) {
      core.warning(
        `Failed to retrieve version from gradle-wrapper.properties file: ${properties} due to ${error}`
      )
    }
  } else {
    core.debug(
      `No gradle-wrapper.properties file existed alongside ${wrapperJar}`
    )
  }
  return undefined
}

async function recursivelyListFiles(baseDir: string): Promise<string[]> {
  const childrenNames = await readdir(baseDir)
  const childrenPaths = await Promise.all(
    childrenNames.map(async childName => {
      const childPath = path.resolve(baseDir, childName)
      return fs.lstatSync(childPath).isDirectory()
        ? recursivelyListFiles(childPath)
        : new Promise(resolve => resolve([childPath]))
    })
  )
  return Array.prototype.concat(...childrenPaths)
}
