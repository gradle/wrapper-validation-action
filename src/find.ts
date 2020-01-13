import * as util from 'util'
import * as path from 'path'
import * as fs from 'fs'

import * as homoglyphs from './homoglyphs'

const readdir = util.promisify(fs.readdir)

export async function findWrapperJars(baseDir: string): Promise<string[]> {
  const targetWords = ['gradle-wrapper.jar']
  const files = await recursivelyListFiles(baseDir)
  return files
    .filter(
      file => homoglyphs.search(path.basename(file), targetWords).length > 0
    )
    .map(wrapperJar => path.relative(baseDir, wrapperJar))
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
