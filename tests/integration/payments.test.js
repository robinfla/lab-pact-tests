require('app-module-path').addPath(`${__dirname}/../../`)

const { expect } = require('code')
const nock = require('nock')
const pygmalion = require('@citizenplane/pygmalion')
const { it,
  describe,
  before,
  beforeEach,
  after,
  afterEach
} = exports.lab = require('lab').script()

const config = require('configurations')
const { initServer } = require('server')
const { getKnexInstance } = require('utils/database')
const { createToken, sleep } = require('utils/helpers')
const {
  mockDynamo,
  mockStripe,
  fakeOrgaSettings
} = require('tests/mocks')

describe('[Integration tests] testing /v1.1/payments', () => {
  let server, db

  before(async ({ context }) => {
    db = getKnexInstance()
    server = await initServer(config, db)
  })

  after(async ({ context }) => {
    nock.cleanAll()
    await server.stop()
  })

  describe(`[GET][V1.1] Get payment intent`, () => {
    beforeEach(mockDynamo.loginSuccess)
    afterEach(nock.cleanAll)

    it('Should find a payment intent', async () => {
      mockStripe.paymentIntentFound('abcdef', 100)

      const response = await server.inject({
        method: 'GET',
        url: `${config.services.bookingApi.url}/v1.1/payments/abcdef`,
        headers: {
          Authorization: `Bearer ${createToken(fakeOrgaSettings(true))}`,
          'Content-Type': 'application/json'
        }
      })
      expect(response.statusCode).to.equal(200)
    })

    it('Should not find a payment intent', async () => {
      mockStripe.paymentIntentNotFound('abcdef')

      const response = await server.inject({
        method: 'GET',
        url: `${config.services.bookingApi.url}/v1.1/payments/abcdef`,
        headers: {
          Authorization: `Bearer ${createToken(fakeOrgaSettings(true))}`,
          'Content-Type': 'application/json'
        }
      })
      expect(response.statusCode).to.equal(400)
    })
  })

  describe(`[POST][V1.1] Create payment intent`, () => {
    beforeEach(mockDynamo.loginSuccess)
    afterEach(nock.cleanAll)

    it('Should create a payment intent', async () => {
      const paymentSchema = require('api/v1.1/payments/schemas/createPayment')
      const payload = pygmalion.generate(paymentSchema)
      mockStripe.paymentIntentCreated()

      const response = await server.inject({
        method: 'POST',
        url: `${config.services.bookingApi.url}/v1.1/payments`,
        payload,
        headers: {
          Authorization: `Bearer ${createToken(fakeOrgaSettings(true))}`,
          'Content-Type': 'application/json'
        }
      })
      expect(response.statusCode).to.equal(200)
    })

    it('Should not create a payment intent', async () => {
      const paymentSchema = require('api/v1.1/payments/schemas/createPayment')
      const payload = pygmalion.generate(paymentSchema)
      mockStripe.paymentIntentCreationFail()

      const response = await server.inject({
        method: 'POST',
        url: `${config.services.bookingApi.url}/v1.1/payments`,
        payload,
        headers: {
          Authorization: `Bearer ${createToken(fakeOrgaSettings(true))}`,
          'Content-Type': 'application/json'
        }
      })
      expect(response.statusCode).to.equal(503)
    })
  })

  describe(`[POST][V1.1] Update payment intent`, () => {
    beforeEach(mockDynamo.loginSuccess)
    afterEach(nock.cleanAll)

    it('Should update a payment intent', async () => {
      const paymentSchema = require('api/v1.1/payments/schemas/updatePayment')
      const payload = pygmalion.generate(paymentSchema)
      mockStripe.paymentIntentUpdated('abcdef')

      const response = await server.inject({
        method: 'PATCH',
        url: `${config.services.bookingApi.url}/v1.1/payments/abcdef`,
        payload,
        headers: {
          Authorization: `Bearer ${createToken(fakeOrgaSettings(true))}`,
          'Content-Type': 'application/json'
        }
      })
      expect(response.statusCode).to.equal(200)
    })

    it('Should not update a payment intent', async () => {
      const paymentSchema = require('api/v1.1/payments/schemas/updatePayment')
      const payload = pygmalion.generate(paymentSchema)
      mockStripe.paymentIntentUpdateFail('abcdef')

      const response = await server.inject({
        method: 'PATCH',
        url: `${config.services.bookingApi.url}/v1.1/payments/abcdef`,
        payload,
        headers: {
          Authorization: `Bearer ${createToken(fakeOrgaSettings(true))}`,
          'Content-Type': 'application/json'
        }
      })
      expect(response.statusCode).to.equal(400)
    })
  })
})
