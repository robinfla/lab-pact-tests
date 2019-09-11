require('app-module-path').addPath(`${__dirname}/../../`)
const { expect } = require('code')
const nock = require('nock')
const { generate } = require('@citizenplane/pygmalion')
const mockDB = require('mock-knex')
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
const { mockDynamo, mockQuery, fakeOrgaSettings } = require('tests/mocks')
const { backend } = require('tests/providers/interactions')

describe('[Integration tests] testing /requests', () => {
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
    // context.dbContent = await mockDb(2)

    // initialize backend mock with pact
    context.provider = require('tests/providers/backend/setup')
    await context.provider.setup()
    // register interactions
    await context.provider.addInteraction(backend.createRequest())
  })

  after(async ({ context }) => {
    // verify the interactions saved with the interaction received
    context.provider.verify()
    // finalize the contract
    context.provider.finalize()
    // clean all mocks
    nock.cleanAll()
    mockQuery.uninstall()
    mockDB.unmock(db)
    await server.stop()
  })

  const apiVersions = [ '1.0', '1.1' ]

  for (let version of apiVersions) {
    describe(`[GET][V${version}] Create request`, () => {
      it('Should return 401 Unauthorized', async () => {
        nock.cleanAll()
        mockDynamo.loginFailed()

        const requestSchema = require(`api/v${version}/requests/schemas/createRequest`)
        const payload = generate(requestSchema)

        const res = await server.inject({
          method: 'POST',
          url: `${config.services.bookingApi.url}/v${version}/requests`,
          headers: {
            Authorization: `Bearer ${createToken(fakeOrgaSettings())}`
          },
          payload
        })
        expect(res.statusCode).to.equal(401)
      })

      it('[POST] Should create a booking request', async ({ context }) => {
        const requestSchema = require(`api/v${version}/requests/schemas/createRequest`)
        const payload = generate(requestSchema)
        mockQuery.customerFound()

        const response = await server.inject({
          method: 'POST',
          url: `${config.services.bookingApi.url}/v${version}/requests`,
          payload: {
            ...payload,
            customer_code: 'abcde'
          },
          headers: {
            Authorization: `Bearer ${createToken(fakeOrgaSettings())}`,
            'Content-Type': 'application/json'
          }
        })

        expect(response.statusCode).to.equal(200)
      })

      it('[POST] Should not create a booking request', async ({ context }) => {
        const requestSchema = require(`api/v${version}/requests/schemas/createRequest`)

        const payload = generate(requestSchema)
        mockQuery.customerNotFound()

        const response = await server.inject({
          method: 'POST',
          url: `${config.services.bookingApi.url}/v${version}/requests`,
          payload: {
            ...payload,
            customer_code: 'abcde'
          },
          headers: {
            Authorization: `Bearer ${createToken(fakeOrgaSettings())}`,
            'Content-Type': 'application/json'
          }
        })
        expect(response.statusCode).to.equal(404)
      })
    })
  }
})
