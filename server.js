const Hapi = require('hapi')
const hapiAuthJWT = require('hapi-auth-jwt2')
const hapiAuthBasic = require('hapi-auth-basic')

const config = require('configurations')
const { logger, formatMetadata } = require('utils/logger')
const { validateBasic, validateJwt } = require('utils/auth')
const { initRoutes } = require('api')

const initServer = async (configs, db) => {
  try {
    const server = Hapi.server({
      host: configs.host,
      port: configs.port,
      routes: {
        cors: {
          credentials: true,
          additionalHeaders: ['Origin', 'X-Requested-With'],
          origin: ['*']
        }
      }
    })

    server.events.on('response', (req) => {
      const statusCode = req.response && req.response.statusCode
      if (statusCode !== 500) {
        logger.info(
          `request to ${req.path}`,
          { type: 'request', ...formatMetadata(req) }
        )
      }
    })

    server.events.on('log', (event, tags) => {
      if (event.channel === 'internal') {
        logger.warn(
          'internal event',
          { type: 'application', data: event.data ? event.data : event.error }
        )
      }
    })

    server.events.on({ name: 'request', channels: 'error' }, (request, event, tags) => {
      logger.error(event.error, { type: 'request', ...formatMetadata(request) })
    })

    // adding auth methods
    await server.register(hapiAuthBasic)
    server.auth.strategy('simple', 'basic', { validate: validateBasic })

    await server.register(hapiAuthJWT)
    server.auth.strategy('jwt', 'jwt', {
      key: config.general.jwtSecret,
      validate: validateJwt,
      verifyOptions: { algorithms: ['HS256'] }
    })

    // adding routes
    initRoutes(server)

    return server
  } catch (err) {
    logger.error(err, { type: 'application' })
    throw err
  }
}

module.exports = {
  initServer
}
