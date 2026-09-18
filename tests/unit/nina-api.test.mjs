import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { fetchDashboardAlerts } = require('../../.test-dist/backend/NinaApi.js')

const response = (body, options = {}) => ({
  ok: true,
  status: 200,
  statusText: 'OK',
  json: async () => body,
  ...options
})

describe('fetchDashboardAlerts', () => {
  it('requests dashboard data for every AGS and returns alerts', async () => {
    const requestedUrls = []
    const alerts = [{ id: 'warning-1' }]
    const fetcher = async (url) => {
      requestedUrls.push(url)
      return response(alerts)
    }

    const results = await fetchDashboardAlerts(['110000000000', '150820440440'], fetcher)

    assert.deepEqual(requestedUrls, [
      'https://warnung.bund.de/api31/dashboard/110000000000.json',
      'https://warnung.bund.de/api31/dashboard/150820000000.json'
    ])
    assert.equal(results[0].status, 'fulfilled')
    assert.deepEqual(results[0].value, alerts)
    assert.equal(results[1].status, 'fulfilled')
  })

  it('rejects a result for an unsuccessful HTTP response', async () => {
    const results = await fetchDashboardAlerts(['110000000000'], async () =>
      response(null, { ok: false, status: 503, statusText: 'Unavailable' })
    )

    assert.equal(results[0].status, 'rejected')
    assert.equal(results[0].reason.message, 'HTTP 503: Unavailable')
  })

  it('keeps successful results when another request fails', async () => {
    const results = await fetchDashboardAlerts(['110000000000', '150820440440'], async (url) => {
      if (url.endsWith('150820000000.json')) {
        throw new Error('network failure')
      }
      return response([{ id: 'warning-1' }])
    })

    assert.equal(results[0].status, 'fulfilled')
    assert.equal(results[1].status, 'rejected')
    assert.equal(results[1].reason.message, 'network failure')
  })
})
