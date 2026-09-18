import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const {
  orderBySeverity,
  removeDuplicates,
  transformNinaAlerts
} = require('../../.test-dist/backend/AlertProcessing.js')

const createConfig = (overrides = {}) => ({
  ags: ['110000000000'],
  downgradeLhpSeverity: false,
  downgradeCancelSeverity: true,
  excludeProviders: [],
  hideCancelledWarnings: false,
  maxAgeInHours: 6,
  mergeAlertsById: true,
  mergeAlertsByTitle: true,
  orderBySeverity: true,
  showCity: true,
  showDate: true,
  showIcon: true,
  showNoWarning: true,
  theme: 'top',
  updateIntervalInSeconds: 120,
  ...overrides
})

const createAlert = (id, severity, title, cityName) => ({
  id,
  sent: new Date().toISOString(),
  date: new Date().toISOString(),
  cityNames: [cityName],
  payload: {
    data: {
      severity,
      provider: 'MOWAS',
      msgType: 'Alert'
    }
  },
  i18nTitle: {
    de: title
  }
})

describe('orderBySeverity', () => {
  it('sorts alerts by severity when enabled', () => {
    const alerts = [
      createAlert('1', 'Cancel', 'A', 'Berlin'),
      createAlert('2', 'Severe', 'B', 'Berlin'),
      createAlert('3', 'Moderate', 'C', 'Berlin')
    ]

    const result = orderBySeverity(alerts, createConfig({ orderBySeverity: true }))
    assert.deepEqual(
      result.map((a) => a.payload.data.severity),
      ['Severe', 'Moderate', 'Cancel']
    )
  })

  it('keeps order unchanged when sorting is disabled', () => {
    const alerts = [createAlert('1', 'Cancel', 'A', 'Berlin'), createAlert('2', 'Severe', 'B', 'Berlin')]

    const result = orderBySeverity(alerts, createConfig({ orderBySeverity: false }))
    assert.deepEqual(
      result.map((a) => a.id),
      ['1', '2']
    )
  })
})

describe('removeDuplicates', () => {
  it('merges alerts with same id and combines city names', () => {
    const alerts = [
      createAlert('id-1', 'Severe', 'Unwetter', 'Berlin'),
      createAlert('id-1', 'Severe', 'Unwetter', 'Hamburg')
    ]

    const result = removeDuplicates(alerts, createConfig({ mergeAlertsById: true, mergeAlertsByTitle: false }))
    assert.equal(result.length, 1)
    assert.deepEqual(result[0].cityNames.sort(), ['Berlin', 'Hamburg'])
  })

  it('merges alerts with same title when configured', () => {
    const alerts = [
      createAlert('id-1', 'Severe', 'Warnung', 'Berlin'),
      createAlert('id-2', 'Severe', 'Warnung', 'Leipzig')
    ]

    const result = removeDuplicates(alerts, createConfig({ mergeAlertsById: false, mergeAlertsByTitle: true }))
    assert.equal(result.length, 1)
    assert.deepEqual(result[0].cityNames.sort(), ['Berlin', 'Leipzig'])
  })

  it('does not merge alerts when both merge options are disabled', () => {
    const alerts = [
      createAlert('id-1', 'Severe', 'Warnung', 'Berlin'),
      createAlert('id-1', 'Severe', 'Warnung', 'Hamburg')
    ]

    const result = removeDuplicates(alerts, createConfig({ mergeAlertsById: false, mergeAlertsByTitle: false }))

    assert.equal(result.length, 2)
  })

  it('deduplicates city names while merging alerts', () => {
    const alerts = [
      createAlert('id-1', 'Severe', 'Warnung', 'Berlin'),
      createAlert('id-1', 'Severe', 'Warnung', 'Berlin'),
      createAlert('id-1', 'Severe', 'Warnung', 'Hamburg')
    ]

    const result = removeDuplicates(alerts, createConfig({ mergeAlertsByTitle: false }))

    assert.deepEqual(result[0].cityNames.sort(), ['Berlin', 'Hamburg'])
  })

  it('does not merge alerts when both German titles are missing', () => {
    const alerts = [
      createAlert('id-1', 'Severe', undefined, 'Berlin'),
      createAlert('id-2', 'Severe', undefined, 'Hamburg')
    ]

    const result = removeDuplicates(alerts, createConfig({ mergeAlertsById: false, mergeAlertsByTitle: true }))

    assert.equal(result.length, 2)
  })
})

describe('transformNinaAlerts', () => {
  const createRawAlert = (id, msgType = 'Alert', provider = 'MOWAS', sentHoursAgo = 1) => ({
    id,
    sent: new Date(Date.now() - sentHoursAgo * 60 * 60 * 1000).toISOString(),
    date: new Date().toISOString(),
    cityNames: [],
    payload: {
      data: {
        severity: 'Moderate',
        provider,
        msgType
      }
    },
    i18nTitle: { de: 'Testwarnung' }
  })

  it('sets cityName on each alert', () => {
    const alerts = [createRawAlert('1')]
    const result = transformNinaAlerts(alerts, createConfig(), 'Dresden')
    assert.deepEqual(result[0].cityNames, ['Dresden'])
  })

  it('sets empty cityNames when cityName is null', () => {
    const alerts = [createRawAlert('1')]
    const result = transformNinaAlerts(alerts, createConfig(), null)
    assert.deepEqual(result[0].cityNames, [])
  })

  it('filters out cancelled alerts when hideCancelledWarnings is true', () => {
    const alerts = [createRawAlert('1', 'Cancel'), createRawAlert('2', 'Alert')]
    const result = transformNinaAlerts(alerts, createConfig({ hideCancelledWarnings: true }), 'Berlin')
    assert.equal(result.length, 1)
    assert.equal(result[0].id, '2')
  })

  it('filters out alerts older than maxAgeInHours', () => {
    const alerts = [createRawAlert('old', 'Alert', 'MOWAS', 10)]
    const result = transformNinaAlerts(alerts, createConfig({ maxAgeInHours: 6 }), 'Berlin')
    assert.equal(result.length, 0)
  })

  it('filters out excluded providers', () => {
    const alerts = [createRawAlert('1', 'Alert', 'LHP'), createRawAlert('2', 'Alert', 'MOWAS')]
    const result = transformNinaAlerts(alerts, createConfig({ excludeProviders: ['LHP'] }), 'Berlin')
    assert.equal(result.length, 1)
    assert.equal(result[0].id, '2')
  })

  it('downgrades LHP severity when configured', () => {
    const alerts = [createRawAlert('lhp', 'Alert', 'LHP')]
    const result = transformNinaAlerts(alerts, createConfig({ downgradeLhpSeverity: true }), 'Berlin')

    assert.equal(result[0].payload.data.severity, 'Moderate')
  })

  it('downgrades cancelled alert severity when configured', () => {
    const alerts = [createRawAlert('cancel', 'Cancel')]
    const result = transformNinaAlerts(alerts, createConfig({ downgradeCancelSeverity: true }), 'Berlin')

    assert.equal(result[0].payload.data.severity, 'Cancel')
  })
})
