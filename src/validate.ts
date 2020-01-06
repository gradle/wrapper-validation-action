import * as find from './find'
import * as checksums from './checksums'
import * as hash from './hash'

export async function findInvalidWrapperJars(
  gitRepoRoot: string,
  allowSnapshots: boolean,
  allowChecksums: string[]
): Promise<InvalidWrapperJar[]> {
  const wrapperJars = await find.findWrapperJars(gitRepoRoot)
  if (wrapperJars.length > 0) {
    const validChecksums = await checksums.fetchValidChecksums(allowSnapshots)
    validChecksums.push(...allowChecksums)
    const invalidWrapperJars: InvalidWrapperJar[] = []
    for (const wrapperJar of wrapperJars) {
      const sha = await hash.sha256File(wrapperJar)
      if (!validChecksums.includes(sha)) {
        invalidWrapperJars.push(new InvalidWrapperJar(wrapperJar, sha))
      }
    }
    return invalidWrapperJars
  }
  return []
}

export class InvalidWrapperJar {
  path: string
  checksum: string
  constructor(path: string, checksum: string) {
    this.path = path
    this.checksum = checksum
  }
}
