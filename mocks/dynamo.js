const faker = require('faker')
const nock = require('nock')

const { fakeOrgaSettings } = require('./fakes')
const config = require('configurations')

const fakeAwsDynamoResponse = () => {
  const organizationSettings = fakeOrgaSettings()

  return {
    Item: {
      orga_id: {
        S: organizationSettings.id
      },
      sandbox: {
        S: organizationSettings.sandbox
      },
      orga_name: {
        S: faker.company.companyName()
      }
    }
  }
}

const loginSuccess = () => {
  return nock(`https://dynamodb.${config.aws.dynamo.region}.amazonaws.com`)
    .persist()
    .post(/.*/)
    .reply(200, JSON.stringify(fakeAwsDynamoResponse()))
}

const loginFailed = () => {
  return nock(`https://dynamodb.${config.aws.dynamo.region}.amazonaws.com`)
    .persist()
    .post(/.*/)
    .reply(200, {})
}

module.exports = {
  loginSuccess,
  loginFailed
}
