require('app-module-path').addPath(`${__dirname}/../../`)

const { expect } = require('code')
const nock = require('nock')
const querystring = require('querystring')
const { generate } = require('@citizenplane/pygmalion')
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
const { createToken, randomLetters } = require('utils/helpers')
const config = require('configurations')
const {
  mockAlgolia,
  mockDynamo,
  fakeOrgaSettings
} = require('tests/mocks')

describe('[Integration] Testing /flights', () => {
  let server, db

  beforeEach(mockDynamo.loginSuccess)
  afterEach(nock.cleanAll)

  before(async () => {
    db = getKnexInstance()
    server = await initServer(config, db)
  })

  after(async () => {
    await server.stop()
  })

  const apiVersions = [ '1.0', '1.1' ]

  for (let version of apiVersions) {
    describe(`[GET][V${version}] Search flights`, () => {
      it('Should return 401 Unauthorized', async () => {
        const res = await server.inject({
          method: 'GET',
          url: `${config.services.bookingApi.url}/v${version}/flights`
        })
        expect(res.statusCode).to.equal(401)
      })

      it('Should return 401 Unauthorized', async () => {
        nock.cleanAll()
        mockDynamo.loginFailed()
        const res = await server.inject({
          method: 'GET',
          url: `${config.services.bookingApi.url}/v${version}/flights`,
          headers: {
            Authorization: `Bearer ${createToken(fakeOrgaSettings)}`
          }
        })
        expect(res.statusCode).to.equal(401)
      })

      it('Should return a 400 Bad Request', async () => {
        const queryParam = {
          origin: new Array(15).fill(randomLetters(3))
        }

        const res = await server.inject({
          method: 'GET',
          url: `${config.services.bookingApi.url}/v${version}/flights?${querystring.stringify(queryParam)}`,
          headers: {
            Authorization: `Bearer ${createToken(fakeOrgaSettings)}`
          }
        })
        expect(res.statusCode).to.equal(400)
      })

      it('Should return a 200 OK with no results', async () => {
        mockAlgolia.flights.notFound()
        mockAlgolia.airports.notFound()
        const flightsSchema = require(`api/v${version}/flights/schemas/getFlights`)
        const queryParam = generate(flightsSchema)

        const res = await server.inject({
          method: 'GET',
          url: `${config.services.bookingApi.url}/v${version}/flights?${querystring.stringify(queryParam)}`,
          headers: {
            Authorization: `Bearer ${createToken(fakeOrgaSettings)}`
          }
        })

        expect(res.statusCode).to.equal(200)
        expect(res.result.results).to.be.an.array()
        expect(res.result.results).to.be.empty()
      })

      it('Should return a 200 OK with results', async () => {
        mockAlgolia.flights.found()
        mockAlgolia.airports.found()
        const flightsSchema = require(`api/v${version}/flights/schemas/getFlights`)
        const queryParam = generate(flightsSchema)

        const res = await server.inject({
          method: 'GET',
          url: `${config.services.bookingApi.url}/v${version}/flights?${querystring.stringify(queryParam)}`,
          headers: {
            Authorization: `Bearer ${createToken(fakeOrgaSettings)}`
          }
        })

        expect(res.statusCode).to.equal(200)
        expect(res.result.results).to.be.an.array()
        expect(res.result.results).to.not.be.empty()
      })
    })
  }
})
