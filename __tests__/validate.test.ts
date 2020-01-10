import * as path from 'path'
import * as validate from '../src/validate'

test('validates wrapper jars', async () => {
  const invalidWrapperJars = await validate.findInvalidWrapperJars(
    path.resolve('.'),
    2,
    false,
    []
  )
  expect(invalidWrapperJars.length).toBe(1)
  expect(invalidWrapperJars[0]).toEqual(
    new validate.InvalidWrapperJar(
      '__tests__/data/invalid/gradle-wrapper.jar',
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    )
  )
})

test('fails if not enough wrapper jars are found', async () => {
  await expect(
    validate.findInvalidWrapperJars(path.resolve('.'), 3, false, [])
  ).rejects.toThrowError(
    'Expected to find at least 3 Gradle Wrapper JARs but got only 2'
  )
})
