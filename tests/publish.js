const pact = require('@pact-foundation/pact-node')
const path = require('path')

const opts = {
  pactFilesOrDirs: [ `${path.join(__dirname, 'pacts')}` ],
  pactBroker: 'http://localhost:9292',
  consumerVersion: '1.0.0'
}

const publish = async () => {
  try {
    const published = await pact.publishPacts(opts)
    return published
  } catch (err) {
    console.log(err)
  }
}

publish()
