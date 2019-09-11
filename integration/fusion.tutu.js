require('app-module-path').addPath(`${__dirname}/../../`)

const { expect } = require('code')
const nock = require('nock')
const querystring = require('querystring')
const { generate } = require('@citizenplane/pygmalion')
const mockDB = require('mock-knex')
const _ = require('lodash')
const {
  it,
  describe,
  before,
  after,
  afterEach,
  beforeEach
} = exports.lab = require('lab').script()

const { initServer } = require('server')
const { getKnexInstance } = require('utils/database')
const { createToken, randomLetters, sleep, round, addCcFee } = require('utils/helpers')
const config = require('configurations')
const { getTotalPassengers } = require('api/v1.0/bookings/utils/createBooking')
const {
  mockAlgolia,
  mockDynamo,
  mockQuery,
  mockStripe,
  mockStripeFee,
  fakeOrgaSettings
} = require('tests/mocks')
const { backend } = require('tests/providers/interactions')

describe('Integration tests', () => {
  let server, db

  before(async ({ context }) => {
    db = getKnexInstance()
    // mockQuery.install()
    mockDB.mock(db)
    server = await initServer(config, db)

    // initialize backend mock with pact
    context.provider = require('tests/providers/backend/setup')
    await sleep(1)
    await context.provider.setup()
  })

  after(async ({ context }) => {
    context.provider.verify()
    context.provider.finalize()
    mockQuery.uninstall()
    mockDB.unmock(db)
    nock.cleanAll()
    await server.stop()
  })

  // describe('[Integration] Testing /flights', () => {
  //   beforeEach(mockDynamo.loginSuccess)
  //   afterEach(nock.cleanAll)
  //   const apiVersions = [ '1.0', '1.1' ]

  //   for (let version of apiVersions) {
  //     describe(`[GET][V${version}] Search flights`, () => {
  //       it('Should return 401 Unauthorized', async () => {
  //         const res = await server.inject({
  //           method: 'GET',
  //           url: `${config.services.bookingApi.url}/v${version}/flights`
  //         })
  //         expect(res.statusCode).to.equal(401)
  //       })

  //       it('Should return 401 Unauthorized', async () => {
  //         nock.cleanAll()
  //         mockDynamo.loginFailed()
  //         const res = await server.inject({
  //           method: 'GET',
  //           url: `${config.services.bookingApi.url}/v${version}/flights`,
  //           headers: {
  //             Authorization: `Bearer ${createToken(fakeOrgaSettings)}`
  //           }
  //         })
  //         expect(res.statusCode).to.equal(401)
  //       })

  //       it('Should return a 400 Bad Request', async () => {
  //         const queryParam = {
  //           origin: new Array(15).fill(randomLetters(3))
  //         }

  //         const res = await server.inject({
  //           method: 'GET',
  //           url: `${config.services.bookingApi.url}/v${version}/flights?${querystring.stringify(queryParam)}`,
  //           headers: {
  //             Authorization: `Bearer ${createToken(fakeOrgaSettings)}`
  //           }
  //         })
  //         expect(res.statusCode).to.equal(400)
  //       })

  //       it('Should return a 200 OK with no results', async () => {
  //         mockAlgolia.flights.notFound()
  //         mockAlgolia.airports.notFound()
  //         const flightsSchema = require(`api/v${version}/flights/schemas/getFlights`)
  //         const queryParam = generate(flightsSchema)

  //         const res = await server.inject({
  //           method: 'GET',
  //           url: `${config.services.bookingApi.url}/v${version}/flights?${querystring.stringify(queryParam)}`,
  //           headers: {
  //             Authorization: `Bearer ${createToken(fakeOrgaSettings)}`
  //           }
  //         })

  //         expect(res.statusCode).to.equal(200)
  //         expect(res.result.results).to.be.an.array()
  //         expect(res.result.results).to.be.empty()
  //       })

  //       it('Should return a 200 OK with results', async () => {
  //         mockAlgolia.flights.found()
  //         mockAlgolia.airports.found()
  //         const flightsSchema = require(`api/v${version}/flights/schemas/getFlights`)
  //         const queryParam = generate(flightsSchema)

  //         const res = await server.inject({
  //           method: 'GET',
  //           url: `${config.services.bookingApi.url}/v${version}/flights?${querystring.stringify(queryParam)}`,
  //           headers: {
  //             Authorization: `Bearer ${createToken(fakeOrgaSettings)}`
  //           }
  //         })

  //         expect(res.statusCode).to.equal(200)
  //         expect(res.result.results).to.be.an.array()
  //         expect(res.result.results).to.not.be.empty()
  //       })
  //     })
  //   }
  // })

  // describe('[Integration tests] Testing /routes', () => {
  //   before(async ({ context }) => {
  //   // register interactions
  //     await context.provider.addInteraction(backend.getRoutes())
  //   })

  //   beforeEach(mockDynamo.loginSuccess)
  //   afterEach(({ context }) => {
  //     // context.provider.verify()
  //     nock.cleanAll()
  //   })

  //   after(async ({ context }) => {
  //   // verify the interactions saved with the interaction received
  //     // context.provider.verify()
  //     nock.cleanAll()
  //   })

  //   const apiVersions = [ '1.0', '1.1' ]

  //   for (let version of apiVersions) {
  //     describe(`[GET][V${version}] List routes`, () => {
  //       it('Should return 401 Unauthorized', async () => {
  //         const res = await server.inject({
  //           method: 'GET',
  //           url: `${config.services.bookingApi.url}/v${version}/routes`
  //         })
  //         expect(res.statusCode).to.equal(401)
  //       })

  //       it('Should return 401 Unauthorized', async () => {
  //         nock.cleanAll()
  //         mockDynamo.loginFailed()
  //         const res = await server.inject({
  //           method: 'GET',
  //           url: `${config.services.bookingApi.url}/v${version}/routes`,
  //           headers: {
  //             Authorization: `Bearer ${createToken(fakeOrgaSettings)}`
  //           }
  //         })
  //         expect(res.statusCode).to.equal(401)
  //       })

  //       it('Should return 200 OK', async () => {
  //         const res = await server.inject({
  //           method: 'GET',
  //           url: `${config.services.bookingApi.url}/v${version}/routes`,
  //           headers: {
  //             Authorization: `Bearer ${createToken(fakeOrgaSettings)}`
  //           }
  //         })
  //         expect(res.statusCode).to.equal(200)
  //       })
  //     })
  //   }
  // })

  // describe('[Integration tests] testing /requests', () => {
  //   before(async ({ context }) => {
  //     // register interactions
  //     await context.provider.addInteraction(backend.createRequest())
  //   })

  //   beforeEach(() => {
  //     mockQuery.install()
  //     mockDynamo.loginSuccess()
  //   })
  //   afterEach(() => {
  //     mockQuery.uninstall()
  //     nock.cleanAll()
  //   })

  //   after(async ({ context }) => {
  //     // verify the interactions saved with the interaction received
  //     // context.provider.verify()
  //     nock.cleanAll()
  //   })

  //   const apiVersions = [ '1.0', '1.1' ]

  //   for (let version of apiVersions) {
  //     describe(`[GET][V${version}] Create request`, () => {
  //       it('[POST] Should create a booking request', async ({ context }) => {
  //         const requestSchema = require(`api/v${version}/requests/schemas/createRequest`)
  //         const payload = generate(requestSchema)
  //         mockQuery.customerFound()

  //         const response = await server.inject({
  //           method: 'POST',
  //           url: `${config.services.bookingApi.url}/v${version}/requests`,
  //           payload: {
  //             ...payload,
  //             customer_code: 'abcde'
  //           },
  //           headers: {
  //             Authorization: `Bearer ${createToken(fakeOrgaSettings())}`,
  //             'Content-Type': 'application/json'
  //           }
  //         })
  //         expect(response.statusCode).to.equal(200)
  //       })

  //       it('Should return 401 Unauthorized', async () => {
  //         nock.cleanAll()
  //         mockDynamo.loginFailed()

  //         const requestSchema = require(`api/v${version}/requests/schemas/createRequest`)
  //         const payload = generate(requestSchema)

  //         const res = await server.inject({
  //           method: 'POST',
  //           url: `${config.services.bookingApi.url}/v${version}/requests`,
  //           headers: {
  //             Authorization: `Bearer ${createToken(fakeOrgaSettings())}`
  //           },
  //           payload
  //         })
  //         expect(res.statusCode).to.equal(401)
  //       })

  //       it('[POST] Should not create a booking request', async ({ context }) => {
  //         const requestSchema = require(`api/v${version}/requests/schemas/createRequest`)

  //         const payload = generate(requestSchema)
  //         mockQuery.customerNotFound()

  //         const response = await server.inject({
  //           method: 'POST',
  //           url: `${config.services.bookingApi.url}/v${version}/requests`,
  //           payload: {
  //             ...payload,
  //             customer_code: 'abcde'
  //           },
  //           headers: {
  //             Authorization: `Bearer ${createToken(fakeOrgaSettings())}`,
  //             'Content-Type': 'application/json'
  //           }
  //         })
  //         expect(response.statusCode).to.equal(404)
  //       })
  //     })
  //   }
  // })

  describe('[Integration tests] testing /bookings', () => {
    before(async ({ context }) => {
      const updatePayload = payload => {
        const mixedPassengers = payload.passengers.map((passenger, index) => {
          return (index === payload.passengers.length - 1) && (index > 0)
            ? { ...passenger, is_infant: true }
            : { ...passenger, is_infant: false }
        })
        const passengerCount = getTotalPassengers(mixedPassengers)
        return {
          ..._.omit(payload, ['customer_data']),
          gender: 'male',
          customer_code: 'acbrt',
          passengers: mixedPassengers,
          passenger_count: passengerCount,
          infant_count: mixedPassengers.length - passengerCount,
          luggage: payload.luggage.map(lug => ({ ...lug, quantity: lug.quantity > passengerCount ? passengerCount : lug.quantity }))
        }
      }

      const bookingSchema = require(`api/v1.0/bookings/schemas/createBooking`)
      const rawPayload = generate(bookingSchema)
      context.bookingPayload = updatePayload(rawPayload)
      await context.provider.addInteraction(backend.getFlight(context.bookingPayload.luggage, context.bookingPayload.request_id))
      await context.provider.addInteraction(backend.createBookingWithCustomerCode())
    })

    describe(`[POST][V1.0] Create booking`, () => {
      // before(async ({ context }) => {
      //   const updatePayload = payload => {
      //     const mixedPassengers = payload.passengers.map((passenger, index) => {
      //       return (index === payload.passengers.length - 1) && (index > 0)
      //         ? { ...passenger, is_infant: true }
      //         : { ...passenger, is_infant: false }
      //     })
      //     return {
      //       ..._.omit(payload, ['customer_data']),
      //       gender: 'male',
      //       customer_code: 'acbrt',
      //       passengers: mixedPassengers,
      //       passenger_count: getTotalPassengers(mixedPassengers),
      //       infant_count: mixedPassengers.length - getTotalPassengers(mixedPassengers)
      //     }
      //   }

      //   const bookingSchema = require(`api/v1.0/bookings/schemas/createBooking`)
      //   const rawPayload = generate(bookingSchema)
      //   context.bookingPayload = updatePayload(rawPayload)
      //   await context.provider.addInteraction(backend.getFlight(context.bookingPayload.luggage, context.bookingPayload.request_id))
      //   await context.provider.addInteraction(backend.createBookingWithCustomerCode())
      // })

      beforeEach(() => {
        mockQuery.install()
        mockDynamo.loginSuccess()
      })
      afterEach(() => {
        mockQuery.uninstall()
        nock.cleanAll()
      })

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

    describe('[Integration tests] testing /v1.1/bookings', () => {
      const formatCardPayload = payload => {
        return {
          ..._.omit(payload, ['passenger_count', 'infant_count', 'request_id']),
          requests: [ payload.request_id ],
          luggage: {
            [payload.request_id]: payload.luggage
          }
        }
      }

      // const getTotalInfant = passengers => passengers.reduce((count, passenger) => passenger.is_infant ? count + 1 : count, 0)

      // const getLuggagePrice = luggage => Object.keys(luggage)
      //   .reduce((count, key) => luggage[key]
      //     .reduce((count, lugg) => count + lugg.price, 0), 0)

      // const getTotalPrice = payload => {
      //   const totalPassengers = getTotalPassengers(payload.passengers)
      //   const totalInfants = getTotalInfant(payload.passengers)

      //   const bookingPrice = round(addCcFee(789) * totalPassengers + addCcFee(222.60) * totalInfants + getLuggagePrice(payload.luggage))(2)
      //   return bookingPrice
      // }

      // const formatPaymentIntentPayload = payload => {
      //   return {
      //     ..._.omit(formatCardPayload(payload), ['customer_code', 'card_token']),
      //     payment_intent_id: 'pi_1abcd345',
      //     customer_data: {
      //       first_name: 'company',
      //       last_name: '',
      //       gender: null,
      //       email: 'company@mail.com',
      //       phonenumber: '+3361111111'
      //     }
      //   }
      // }
      // before(async ({ context }) => {
        // const bookingSchema = require(`api/v1.1/bookings/schemas/createBooking`)

        // context.rawPayload = generate(bookingSchema)
      // })

      describe(`[POST][V1.1] Create booking with card token`, () => {
        beforeEach(() => {
          mockDynamo.loginSuccess()
          mockQuery.install()
        })

        before(async ({ context }) => {
          context.cardPayload = formatCardPayload(context.bookingPayload)
        })

        afterEach(() => {
          nock.cleanAll()
          mockQuery.uninstall()
        })


        it('Should create a booking', async ({ context }) => {
          mockQuery.createBookingSuccess({
            seats: context.bookingPayload.passenger_count,
            customerCode: context.bookingPayload.customer_code,
            version: '1.1'
          })
          mockStripe.paymentSucceeded()
          mockStripeFee()

          const response = await server.inject({
            method: 'POST',
            url: `${config.services.bookingApi.url}/v1.1/bookings`,
            payload: context.cardPayload,
            headers: {
              Authorization: `Bearer ${createToken(fakeOrgaSettings(false))}`,
              'Content-Type': 'application/json'
            }
          })
          expect(response.statusCode).to.equal(200)
        })

        it('Should not create a booking and return a 403', async ({ context }) => {
          mockQuery.createBookingRequestAborted({
            seats: context.bookingPayload.passenger_count,
            customerCode: context.bookingPayload.customer_code,
            version: '1.1'
          })

          const response = await server.inject({
            method: 'POST',
            url: `${config.services.bookingApi.url}/v1.1/bookings`,
            payload: context.cardPayload,
            headers: {
              Authorization: `Bearer ${createToken(fakeOrgaSettings(false))}`,
              'Content-Type': 'application/json'
            }
          })
          expect(response.statusCode).to.equal(403)
        })

        it('Should not create a booking and return a 404', async ({ context }) => {
          mockQuery.createBookingCustomerNotFound({
            seats: context.bookingPayload.passenger_count,
            customerCode: context.bookingPayload.customer_code
          })

          const response = await server.inject({
            method: 'POST',
            url: `${config.services.bookingApi.url}/v1.1/bookings`,
            payload: context.cardPayload,
            headers: {
              Authorization: `Bearer ${createToken(fakeOrgaSettings(false))}`,
              'Content-Type': 'application/json'
            }
          })
          expect(response.statusCode).to.equal(404)
        })

        it('Should not create a booking and return a 422', async ({ context }) => {
          mockQuery.createBookingSuccess({
            seats: context.bookingPayload.passenger_count,
            customerCode: context.bookingPayload.customer_code,
            version: '1.1'
          })
          mockStripe.paymentFailed()

          const response = await server.inject({
            method: 'POST',
            url: `${config.services.bookingApi.url}/v1.1/bookings`,
            payload: context.cardPayload,
            headers: {
              Authorization: `Bearer ${createToken(fakeOrgaSettings(false))}`,
              'Content-Type': 'application/json'
            }
          })
          expect(response.statusCode).to.equal(422)
        })
      })
    })
  })
})
