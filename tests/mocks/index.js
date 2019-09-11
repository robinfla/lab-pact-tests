const { mockStripe } = require('./stripe')
const { mockStripeFee } = require('./stripeFee')
const { mockQuery } = require('./database')
const { fakeOrgaSettings } = require('./fakes')
const mockAlgolia = require('./algolia')
const mockDynamo = require('./dynamo')

module.exports = {
  mockAlgolia,
  mockDynamo,
  mockQuery,
  mockStripe,
  mockStripeFee,
  fakeOrgaSettings
}
