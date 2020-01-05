import * as find from "./find"
import * as checksums from "./checksums"
import * as hash from "./hash"


export async function findInvalidWrapperJars(gitRepoRoot: string, allowSnapshots: boolean): Promise<string[]> {

    const wrapperJars = await find.findWrapperJars(gitRepoRoot)
    if (wrapperJars.length > 0) {
        const validChecksums = await checksums.fetchValidChecksums(allowSnapshots)
        const invalidWrapperJars: string[] = []
        for (let wrapperJar of wrapperJars) {
            const sha = await hash.sha256File(wrapperJar)
            if (validChecksums.indexOf(sha) < 0) {
                invalidWrapperJars.push(wrapperJar)
            }
        }
        return invalidWrapperJars
    }
    return []
}
