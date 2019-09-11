const nock = require('nock')
const { round, randomNumber } = require('utils/helpers')

const mockStripeFee = () => {
  nock('https://stripe-fee.citizenplane.com:443')
    .persist()
    .post('/compute')
    .reply(200, {
      stripe_fee: round(Math.random() * randomNumber(1)(20))(2),
      currency: 'eur'
    })
}

module.exports = {
  mockStripeFee
}
