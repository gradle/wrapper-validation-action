import * as path from 'path'
import * as find from '../src/find'
import {expect, test} from '@jest/globals'

test('finds test data wrapper jars', async () => {
  const repoRoot = path.resolve('.')
  const wrapperJars = await find.findWrapperJars(repoRoot)
  expect(wrapperJars.length).toBe(3)
  expect(wrapperJars).toContain('__tests__/data/valid/gradle-wrapper.jar')
  expect(wrapperJars).toContain('__tests__/data/invalid/gradle-wrapper.jar')
  expect(wrapperJars).toContain('__tests__/data/invalid/gradlе-wrapper.jar') // homoglyph
})

test('detect version from `gradle-wrapper.properties` alongside wrappers', async () => {
  const repoRoot = path.resolve('.')
  const wrapperJars = await find.findWrapperJars(repoRoot)

  const detectedVersions = await find.detectVersions(wrapperJars)

  expect(detectedVersions.length).toBe(1)
  expect(detectedVersions).toContain('6.1-milestone-3')
})
