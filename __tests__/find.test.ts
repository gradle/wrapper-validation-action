import * as path from "path";
import * as find from '../src/find'

test('finds test data wrapper jars', async () => {
    let repoRoot = path.resolve('.')
    let wrapperJars = await find.findWrapperJars(repoRoot)
    expect(wrapperJars.length).toBe(2)
    expect(wrapperJars).toContain("__tests__/data/valid/gradle-wrapper.jar")
    expect(wrapperJars).toContain("__tests__/data/invalid/gradle-wrapper.jar")
})
