const { Pact } = require('@pact-foundation/pact')
const path = require('path')
const config = require('configurations')

module.exports = new Pact({
  consumer: 'booking-api',
  provider: 'backend',
  port: parseInt(config.services.backend.port),
  host: '0.0.0.0',
  logs: path.resolve(process.cwd(), 'src/tests/logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'src/tests/pacts'),
  logLevel: 'info',
  spec: 2,
  pactFileWriteMode: 'merge'
})
