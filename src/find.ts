import {Repository, Commit, Tree, TreeEntry} from 'nodegit'


export async function findWrapperJars(gitRepoPath: string): Promise<string[]> {

    let repo: Repository = await Repository.open(gitRepoPath)
    let commit: Commit = await repo.getMasterCommit()
    let tree: Tree = await commit.getTree()
    let walker = tree.walk()

    let prom: Promise<string[]> = new Promise(((resolve, reject) => {

        let wrapperJars: string[] = []

        walker.on("entry", (entry: TreeEntry) => {
            let path = entry.path()
            if (path.endsWith('gradle-wrapper.jar')) {
                wrapperJars.push(path)
            }
        })
        walker.on("error", (error) => {
            reject(error)
        })
        walker.on("end", (trees) => {
            resolve(wrapperJars)
        })

    }))
    walker.start()
    return prom
}
