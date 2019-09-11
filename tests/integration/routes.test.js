require('app-module-path').addPath(`${__dirname}/../../`)
const { expect } = require('code')
const nock = require('nock')
const {
  it,
  describe,
  before,
  after,
  afterEach,
  beforeEach
} = exports.lab = require('lab').script()

const config = require('configurations')
const { initServer } = require('server')
const { getKnexInstance } = require('utils/database')
const { createToken, sleep } = require('utils/helpers')
const { mockDynamo, fakeOrgaSettings } = require('tests/mocks')
const { backend } = require('tests/providers/interactions')

describe('[Integration tests] Testing /routes', () => {
  let server
  beforeEach(mockDynamo.loginSuccess)
  afterEach(nock.cleanAll)

  before(async ({ context }) => {
    const db = getKnexInstance()
    server = await initServer(config, db)

    // initialize backend mock with pact
    context.provider = require('tests/providers/backend/setup')
    await sleep(1)
    await context.provider.setup()
    // register interactions
    await context.provider.addInteraction(backend.getRoutes())
  })

  after(async ({ context }) => {
    // verify the interactions saved with the interaction received
    context.provider.verify()
    // finalize the contract
    context.provider.finalize()
    // clean all mocks
    nock.cleanAll()
    await server.stop()
  })

  const apiVersions = [ '1.0', '1.1' ]

  for (let version of apiVersions) {
    describe(`[GET][V${version}] List routes`, () => {
      it('Should return 401 Unauthorized', async () => {
        const res = await server.inject({
          method: 'GET',
          url: `${config.services.bookingApi.url}/v${version}/routes`
        })
        expect(res.statusCode).to.equal(401)
      })

      it('Should return 401 Unauthorized', async () => {
        nock.cleanAll()
        mockDynamo.loginFailed()
        const res = await server.inject({
          method: 'GET',
          url: `${config.services.bookingApi.url}/v${version}/routes`,
          headers: {
            Authorization: `Bearer ${createToken(fakeOrgaSettings)}`
          }
        })
        expect(res.statusCode).to.equal(401)
      })

      it('Should return 200 OK', async () => {
        const res = await server.inject({
          method: 'GET',
          url: `${config.services.bookingApi.url}/v${version}/routes`,
          headers: {
            Authorization: `Bearer ${createToken(fakeOrgaSettings)}`
          }
        })
        expect(res.statusCode).to.equal(200)
      })
    })
  }
})
