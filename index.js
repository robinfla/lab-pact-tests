require('app-module-path').addPath(__dirname)
const { initServer } = require('server')
const { getKnexInstance } = require('utils/database')
const config = require('configurations')
const { logger } = require('utils/logger')

logger.debug(`Running environment ${config.environment || 'dev'}`, { type: 'application' })

// Define async start function
const start = async (config, db) => {
  try {
    const server = await initServer(config, db)
    await server.start()
    logger.info(`Server running at: ${server.info.uri}`, { type: 'application' })
  } catch (err) {
    logger.error(err, { type: 'application' })
    throw err
  }
}

// Start the server
start(config, getKnexInstance())
