import * as checksums from '../src/checksums'

test('fetches wrapper jars checksums', async () => {
  const validChecksums = await checksums.fetchValidChecksums(false)
  expect(validChecksums.length).toBeGreaterThan(10)
})
