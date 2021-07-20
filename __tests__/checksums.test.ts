import * as checksums from '../src/checksums'
import nock from 'nock'
import {afterEach, describe, expect, test} from '@jest/globals'

test('fetches wrapper jars checksums', async () => {
  const validChecksums = await checksums.fetchValidChecksums(false)
  expect(validChecksums.length).toBeGreaterThan(10)
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

      const validChecksums = await checksums.fetchValidChecksums(false)
      expect(validChecksums.length).toBeGreaterThan(10)
      nock.isDone()
    })
  })
})
