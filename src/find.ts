import {Repository, Commit, Tree, TreeEntry} from 'nodegit'

export async function findWrapperJars(gitRepoPath: string): Promise<string[]> {
  const repo: Repository = await Repository.open(gitRepoPath)
  const commit: Commit = await repo.getHeadCommit()
  const tree: Tree = await commit.getTree()
  const walker = tree.walk()

  const prom: Promise<string[]> = new Promise((resolve, reject) => {
    const wrapperJars: string[] = []

    walker.on('entry', (entry: TreeEntry) => {
      const path = entry.path()
      if (path.endsWith('gradle-wrapper.jar')) {
        wrapperJars.push(path)
      }
    })
    walker.on('error', error => {
      reject(error)
    })
    walker.on('end', () => {
      resolve(wrapperJars)
    })
  })
  walker.start()
  return prom
}
