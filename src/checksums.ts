import * as httpm from 'typed-rest-client/HttpClient'

const httpc = new httpm.HttpClient('gradle/wrapper-validation-action')

export async function fetchValidChecksums(
  allowSnapshots: boolean
): Promise<string[]> {
  const all = await httpGetJsonArray('https://services.gradle.org/versions/all')
  const withChecksum = all.filter(
    entry =>
      typeof entry === 'object' &&
      entry != null &&
      entry.hasOwnProperty('wrapperChecksumUrl')
  )
  const allowed = withChecksum.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (entry: any) => allowSnapshots || !entry.snapshot
  )
  const checksumUrls = allowed.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (entry: any) => entry.wrapperChecksumUrl as string
  )
  const checksums = await Promise.all(
    checksumUrls.map(async (url: string) => httpGetText(url))
  )
  return [...new Set(checksums)]
}

async function httpGetJsonArray(url: string): Promise<unknown[]> {
  return JSON.parse(await httpGetText(url))
}

async function httpGetText(url: string): Promise<string> {
  const response = await httpc.get(url)
  return await response.readBody()
}
