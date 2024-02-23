import * as checksums from '../src/checksums'
import nock from 'nock'
import {afterEach, describe, expect, test, jest} from '@jest/globals'

jest.setTimeout(30000)

test('has loaded hardcoded wrapper jars checksums', async () => {
  // Sanity check that generated checksums file is not empty and was properly imported
  expect(checksums.KNOWN_VALID_CHECKSUMS.size).toBeGreaterThan(10)
  // Verify that checksums of arbitrary versions are contained
  expect(
    checksums.KNOWN_VALID_CHECKSUMS.get(
      '660ab018b8e319e9ae779fdb1b7ac47d0321bde953bf0eb4545f14952cfdcaa3'
    )
  ).toEqual(new Set(['4.10.3']))
  expect(
    checksums.KNOWN_VALID_CHECKSUMS.get(
      '28b330c20a9a73881dfe9702df78d4d78bf72368e8906c70080ab6932462fe9e'
    )
  ).toEqual(new Set(['6.0-rc-1', '6.0-rc-2', '6.0-rc-3', '6.0', '6.0.1']))
})

test('fetches wrapper jars checksums', async () => {
  const validChecksums = await checksums.fetchValidChecksums(false, false, [])
  expect(validChecksums.size).toBeGreaterThan(10)
  // Verify that checksum of arbitrary version is contained
  expect(
    validChecksums.has(
      // Checksum for version 6.0
      '28b330c20a9a73881dfe9702df78d4d78bf72368e8906c70080ab6932462fe9e'
    )
  ).toBe(true)
})

test('fetches wrapper jars checksums only for detected versions', async () => {
  const validChecksums = await checksums.fetchValidChecksums(false, true, [
    '8.2.1'
  ])
  expect(validChecksums.size).toBe(1)
})

describe('retry', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('for /versions/all API', () => {
    test('retry three times', async () => {
      nock('https://services.gradle.org', {allowUnmocked: true})
        .get('/versions/all')
        .times(3)
        .replyWithError({
          message: 'connect ECONNREFUSED 104.18.191.9:443',
          code: 'ECONNREFUSED'
        })

      const validChecksums = await checksums.fetchValidChecksums(
        false,
        false,
        []
      )
      expect(validChecksums.size).toBeGreaterThan(10)
      nock.isDone()
    })
  })
})
