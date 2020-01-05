import * as httpm from 'typed-rest-client/HttpClient'

const httpc = new httpm.HttpClient("eskatos/gradle-wrapper-check");

export async function fetchValidChecksums(allowSnapshots: boolean): Promise<string[]> {
    let all: any[] = await httpGetJson('https://services.gradle.org/versions/all')
    let withChecksum = all.filter(entry => entry.hasOwnProperty('wrapperChecksumUrl'))
    let allowed = withChecksum.filter(entry => allowSnapshots || !entry.snapshot)
    let checksumUrls: string[] = allowed.map(entry => entry.wrapperChecksumUrl)
    let checksums = await Promise.all(checksumUrls.map((url: string) => httpGetText(url)))
    return [...new Set(checksums)]
}

async function httpGetJson(url: string): Promise<any> {
    return JSON.parse(await httpGetText(url));
}

async function httpGetText(url: string): Promise<string> {
    const response = await httpc.get(url);
    return await response.readBody();
}
