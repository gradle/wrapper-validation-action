import * as path from 'path'
import * as validate from '../src/validate'

test('validates wrapper jars', async () => {
  const invalidWrapperJars = await validate.findInvalidWrapperJars(
    path.resolve('.'),
    false
  )
  expect(invalidWrapperJars.length).toBe(1)
  expect(invalidWrapperJars[0]).toEqual(
    '__tests__/data/invalid/gradle-wrapper.jar'
  )
})
