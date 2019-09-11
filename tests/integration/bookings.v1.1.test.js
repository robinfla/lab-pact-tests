require('app-module-path').addPath(`${__dirname}/../../`)

const nock = require('nock')
const mockDB = require('mock-knex')
const _ = require('lodash')
const path = require('path')
const { expect } = require('code')
const { generate } = require('@citizenplane/pygmalion')
const { publishPacts } = require('@pact-foundation/pact-node')
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
const { createToken, round, addCcFee, sleep } = require('utils/helpers')
const { getTotalPassengers } = require('api/v1.0/bookings/utils/createBooking')
const { backend } = require('tests/providers/interactions')
const {
  mockDynamo,
  mockQuery,
  mockStripe,
  mockStripeFee,
  fakeOrgaSettings
} = require('tests/mocks')

const formatCardPayload = payload => {
  const mixedPassengers = payload.passengers.map((passenger, index) => {
    return (index === payload.passengers.length - 1) && (index > 0)
      ? { ...passenger, is_infant: true }
      : { ...passenger, is_infant: false }
  })

  const luggage = {
    [payload.requests[0]]: payload.luggage[Object.keys(payload.luggage)[0]].map(luggage => {
      return {
        ...luggage,
        quantity: getTotalPassengers(mixedPassengers)
      }
    })
  }

  return {
    ..._.omit(payload, ['customer_data', 'payment_intent_id']),
    gender: 'male',
    customer_code: 'acbrt',
    card_token: 'mnopqrst',
    passengers: mixedPassengers,
    luggage
  }
}

const getTotalInfant = passengers => passengers.reduce((count, passenger) => passenger.is_infant ? count + 1 : count, 0)

const getLuggagePrice = luggage => Object.keys(luggage)
  .reduce((count, key) => luggage[key]
    .reduce((count, lugg) => count + lugg.price, 0), 0)

const getTotalPrice = payload => {
  const totalPassengers = getTotalPassengers(payload.passengers)
  const totalInfants = getTotalInfant(payload.passengers)

  const bookingPrice = round(addCcFee(789) * totalPassengers + addCcFee(222.60) * totalInfants + getLuggagePrice(payload.luggage))(2)
  return bookingPrice
}

const formatPaymentIntentPayload = payload => {
  return {
    ..._.omit(formatCardPayload(payload), ['customer_code', 'card_token']),
    payment_intent_id: 'pi_1abcd345',
    customer_data: {
      first_name: 'company',
      last_name: '',
      gender: null,
      email: 'company@mail.com',
      phonenumber: '+3361111111'
    }
  }
}

describe('[Integration tests] testing /v1.1/bookings', () => {
  let server, db
  before(async ({ context }) => {
    db = getKnexInstance()
    mockQuery.install()
    mockDB.mock(db)

    server = await initServer(config, db)

    const bookingSchema = require(`api/v1.1/bookings/schemas/createBooking`)

    context.rawPayload = generate(bookingSchema)

    await sleep(1)
    // initialize backend mock with pact
    context.provider = require('tests/providers/backend/setup')
    await context.provider.setup()
  })

  after(async ({ context }) => {
    context.provider.finalize()
    nock.cleanAll()
    mockQuery.uninstall()
    mockDB.unmock(db)
    await server.stop()
  })

  describe(`[POST][V1.1] Create booking with card token`, () => {
    beforeEach(() => {
      mockDynamo.loginSuccess()
      mockQuery.install()
    })

    before(async ({ context }) => {
      context.bookingPayload = formatCardPayload(context.rawPayload)
      await context.provider.addInteraction(
        backend.getFlight(
          context.bookingPayload.luggage[Object.keys(context.bookingPayload.luggage)[0]],
          context.bookingPayload.requests.join(',')
        )
      )
      await context.provider.addInteraction(backend.createBookingWithCustomerCode())
    })

    afterEach(() => {
      nock.cleanAll()
      mockQuery.uninstall()
    })

    after(({ context }) => context.provider.verify())

    it('Should create a booking', async ({ context }) => {
      mockQuery.createBookingSuccess({
        seats: getTotalPassengers(context.bookingPayload.passengers),
        customerCode: context.bookingPayload.customer_code,
        version: '1.1'
      })
      mockStripe.paymentSucceeded()
      mockStripeFee()

      const response = await server.inject({
        method: 'POST',
        url: `${config.services.bookingApi.url}/v1.1/bookings`,
        payload: context.bookingPayload,
        headers: {
          Authorization: `Bearer ${createToken(fakeOrgaSettings(false))}`,
          'Content-Type': 'application/json'
        }
      })
      expect(response.statusCode).to.equal(200)
    })

    it('Should not create a booking and return a 403', async ({ context }) => {
      mockQuery.createBookingRequestAborted({
        seats: getTotalPassengers(context.bookingPayload.passengers),
        customerCode: context.bookingPayload.customer_code,
        version: '1.1'
      })

      const response = await server.inject({
        method: 'POST',
        url: `${config.services.bookingApi.url}/v1.1/bookings`,
        payload: context.bookingPayload,
        headers: {
          Authorization: `Bearer ${createToken(fakeOrgaSettings(false))}`,
          'Content-Type': 'application/json'
        }
      })
      expect(response.statusCode).to.equal(403)
    })

    it('Should not create a booking and return a 404', async ({ context }) => {
      mockQuery.createBookingCustomerNotFound({
        seats: getTotalPassengers(context.bookingPayload.passengers),
        customerCode: context.bookingPayload.customer_code
      })

      const response = await server.inject({
        method: 'POST',
        url: `${config.services.bookingApi.url}/v1.1/bookings`,
        payload: context.bookingPayload,
        headers: {
          Authorization: `Bearer ${createToken(fakeOrgaSettings(false))}`,
          'Content-Type': 'application/json'
        }
      })
      expect(response.statusCode).to.equal(404)
    })

    it('Should not create a booking and return a 422', async ({ context }) => {
      mockQuery.createBookingSuccess({
        seats: getTotalPassengers(context.bookingPayload.passengers),
        customerCode: context.bookingPayload.customer_code,
        version: '1.1'
      })
      mockStripe.paymentFailed()

      const response = await server.inject({
        method: 'POST',
        url: `${config.services.bookingApi.url}/v1.1/bookings`,
        payload: context.bookingPayload,
        headers: {
          Authorization: `Bearer ${createToken(fakeOrgaSettings(false))}`,
          'Content-Type': 'application/json'
        }
      })
      expect(response.statusCode).to.equal(422)
    })
  })

  describe(`[POST][V1.1] Create booking with payment intent`, () => {
    beforeEach(() => {
      mockDynamo.loginSuccess()
      mockQuery.install()
    })

    before(async ({ context }) => {
      context.bookingPayload = formatPaymentIntentPayload(context.rawPayload)
      await context.provider.addInteraction(backend.createBookingWithCustomerData())

      await context.provider.addInteraction(
        backend.getFlight(
          context.bookingPayload.luggage[Object.keys(context.bookingPayload.luggage)[0]],
          context.bookingPayload.requests.join(',')
        )
      )
    })

    afterEach(() => {
      nock.cleanAll()
      mockQuery.uninstall()
    })

    after(({ context }) => context.provider.verify())

    it('Should create a booking', async ({ context }) => {
      mockQuery.createBookingSuccess({
        seats: getTotalPassengers(context.bookingPayload.passengers),
        version: '1.1'
      })
      mockStripe.paymentIntentFound(context.bookingPayload.payment_intent_id, getTotalPrice(context.bookingPayload))
      mockStripeFee()

      const response = await server.inject({
        method: 'POST',
        url: `${config.services.bookingApi.url}/v1.1/bookings`,
        payload: context.bookingPayload,
        headers: {
          Authorization: `Bearer ${createToken(fakeOrgaSettings('true'))}`,
          'Content-Type': 'application/json'
        }
      })
      expect(response.statusCode).to.equal(200)
    })

    it('Should not create a booking and return a 422', async ({ context }) => {
      mockQuery.createBookingSuccess({
        seats: getTotalPassengers(context.bookingPayload.passengers),
        version: '1.1'
      })
      mockStripe.paymentIntentNotFound(context.bookingPayload.payment_intent_id)
      mockStripeFee()

      const response = await server.inject({
        method: 'POST',
        url: `${config.services.bookingApi.url}/v1.1/bookings`,
        payload: context.bookingPayload,
        headers: {
          Authorization: `Bearer ${createToken(fakeOrgaSettings('true'))}`,
          'Content-Type': 'application/json'
        }
      })
      expect(response.statusCode).to.equal(422)
    })

    it('Should not create a booking and return a 403', async ({ context }) => {
      mockQuery.createBookingRequestAborted({
        seats: getTotalPassengers(context.bookingPayload.passengers),
        version: '1.1'
      })

      const response = await server.inject({
        method: 'POST',
        url: `${config.services.bookingApi.url}/v1.1/bookings`,
        payload: context.bookingPayload,
        headers: {
          Authorization: `Bearer ${createToken(fakeOrgaSettings('true'))}`,
          'Content-Type': 'application/json'
        }
      })
      expect(response.statusCode).to.equal(403)
    })
  })
})
