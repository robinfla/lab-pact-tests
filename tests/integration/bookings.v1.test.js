require('app-module-path').addPath(`${__dirname}/../../`)

const nock = require('nock')
const path = require('path')
const mockDB = require('mock-knex')
const _ = require('lodash')
const { expect } = require('code')
const { publishPacts } = require('@pact-foundation/pact-node')
const { generate } = require('@citizenplane/pygmalion')
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
const { getTotalPassengers } = require('api/v1.0/bookings/utils/createBooking')
const { createToken, sleep } = require('utils/helpers')
const { backend } = require('tests/providers/interactions')
const {
  mockDynamo,
  mockQuery,
  mockStripe,
  mockStripeFee,
  fakeOrgaSettings
} = require('tests/mocks')

const updatePayload = payload => {
  const mixedPassengers = payload.passengers.map((passenger, index) => {
    return (index === payload.passengers.length - 1) && (index > 0)
      ? { ...passenger, is_infant: true }
      : { ...passenger, is_infant: false }
  })
  return {
    ..._.omit(payload, ['customer_data']),
    gender: 'male',
    customer_code: 'acbrt',
    passengers: mixedPassengers,
    passenger_count: getTotalPassengers(mixedPassengers),
    infant_count: mixedPassengers.length - getTotalPassengers(mixedPassengers)
  }
}

describe('[Integration tests] testing /bookings', () => {
  let server, db
  beforeEach(() => {
    mockDynamo.loginSuccess()
    mockQuery.install()
  })

  afterEach(() => {
    nock.cleanAll()
    mockQuery.uninstall()
  })

  before(async ({ context }) => {
    await sleep(1)
    db = getKnexInstance()
    mockQuery.install()
    mockDB.mock(db)

    server = await initServer(config, db)

    // initialize backend mock with pact
    context.provider = require('tests/providers/backend/setup')
    await context.provider.setup()
  })

  after(async ({ context }) => {
    context.provider.verify()
    context.provider.finalize()
    nock.cleanAll()
    mockQuery.uninstall()
    mockDB.unmock(db)
    await server.stop()
  })

  describe(`[POST][V1.0] Create booking`, () => {
    before(async ({ context }) => {
      const bookingSchema = require(`api/v1.0/bookings/schemas/createBooking`)
      const rawPayload = generate(bookingSchema)
      context.bookingPayload = updatePayload(rawPayload)
      await context.provider.addInteraction(backend.getFlight(context.bookingPayload.luggage, context.bookingPayload.request_id))
      await context.provider.addInteraction(backend.createBookingWithCustomerCode())
    })

    afterEach(nock.cleanAll)

    it('Should create a booking', async ({ context }) => {
      mockQuery.createBookingSuccess({
        seats: context.bookingPayload.passenger_count,
        customerCode: context.bookingPayload.customer_code,
        version: '1.0'
      })
      mockStripe.paymentSucceeded()
      mockStripeFee()

      const response = await server.inject({
        method: 'POST',
        url: `${config.services.bookingApi.url}/v1.0/bookings`,
        payload: context.bookingPayload,
        headers: {
          Authorization: `Bearer ${createToken(fakeOrgaSettings())}`,
          'Content-Type': 'application/json'
        }
      })
      expect(response.statusCode).to.equal(200)
    })

    it('Should not create a booking and return a 403', async ({ context }) => {
      mockQuery.createBookingRequestAborted({
        seats: context.bookingPayload.passenger_count,
        customerCode: context.bookingPayload.customer_code,
        version: '1.0'
      })

      const response = await server.inject({
        method: 'POST',
        url: `${config.services.bookingApi.url}/v1.0/bookings`,
        payload: context.bookingPayload,
        headers: {
          Authorization: `Bearer ${createToken(fakeOrgaSettings())}`,
          'Content-Type': 'application/json'
        }
      })
      expect(response.statusCode).to.equal(403)
    })

    it('Should not create a booking and return a 404', async ({ context }) => {
      mockQuery.createBookingCustomerNotFound({
        seats: context.bookingPayload.passenger_count,
        customerCode: context.bookingPayload.customer_code,
        version: '1.0'
      })

      const response = await server.inject({
        method: 'POST',
        url: `${config.services.bookingApi.url}/v1.0/bookings`,
        payload: context.bookingPayload,
        headers: {
          Authorization: `Bearer ${createToken(fakeOrgaSettings())}`,
          'Content-Type': 'application/json'
        }
      })
      expect(response.statusCode).to.equal(404)
    })

    it('Should not create a booking and return a 422', async ({ context }) => {
      mockQuery.createBookingSuccess({
        seats: context.bookingPayload.passenger_count,
        customerCode: context.bookingPayload.customer_code,
        version: '1.0'
      })
      mockStripe.paymentFailed()

      const response = await server.inject({
        method: 'POST',
        url: `${config.services.bookingApi.url}/v1.0/bookings`,
        payload: context.bookingPayload,
        headers: {
          Authorization: `Bearer ${createToken(fakeOrgaSettings())}`,
          'Content-Type': 'application/json'
        }
      })
      expect(response.statusCode).to.equal(422)
    })
  })
})
