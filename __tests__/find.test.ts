import * as path from 'path'
import * as find from '../src/find'

test('finds test data wrapper jars', async () => {
  const repoRoot = path.resolve('.')
  const wrapperJars = await find.findWrapperJars(repoRoot)
  expect(wrapperJars.length).toBe(3)
  expect(wrapperJars).toContain('__tests__/data/valid/gradle-wrapper.jar')
  expect(wrapperJars).toContain('__tests__/data/invalid/gradle-wrapper.jar')
  expect(wrapperJars).toContain('__tests__/data/invalid/gradlе-wrapper.jar') // homoglyph
})
