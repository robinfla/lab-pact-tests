const nock = require('nock')

const paymentSucceeded = () => {
  nock('https://api.stripe.com:443')
    .post('/v1/charges')
    .reply(200, {
      message: 'payment succeeded',
      id: 'ch_1FB2141541',
      source: {
        id: 'card_1FBcW023445',
        country: 'FR'
      }
    })
}

const paymentFailed = () => {
  nock('https://api.stripe.com:443')
    .post('/v1/charges')
    .reply(200, {
      type: 'stripeError',
      payload: {
        message: 'payment failed'
      }
    })
}

const paymentIntentFound = (id, amount) => {
  nock('https://api.stripe.com:443')
    .get(`/v1/payment_intents/${id}`)
    .reply(200, {
      id,
      amount: amount * 100,
      charges: {
        data: [{
          id: 'card_1FBcW0CL124254',
          payment_method_details: {
            card: {
              country: 'FR'
            }
          }
        }]
      }
    })
}

const paymentIntentNotFound = id => {
  nock('https://api.stripe.com:443')
    .get(`/v1/payment_intents/${id}`)
    .reply(404, {
      error: {
        code: 'resource_missing',
        doc_url: 'https://stripe.com/docs/error-codes/resource-missing',
        message: 'No such payment_intent: abcdef',
        param: 'intent',
        type: 'invalid_request_error' }
    })
}

const paymentIntentCreated = () => {
  nock('https://api.stripe.com:443')
    .post('/v1/payment_intents')
    .reply(200, {
      paymentIntent: {
        id: 'pi_123abc',
        object: 'payment_intent'
      },
      amount: 1000
    })
}

const paymentIntentCreationFail = id => {
  nock(`https://api.stripe.com:443/${id}`)
    .post('/v1/payment_intents')
    .replyWithError(500, {
      code: 'internal_error',
      statusCode: 500
    })
}

const paymentIntentUpdated = id => {
  nock('https://api.stripe.com:443', { 'encodedQueryParams': true })
    .post(`/v1/payment_intents/${id}`)
    .reply(200, {
      paymentIntent: {
        id: `${id}`,
        object: 'payment_intent'
      },
      amount: 1000
    })
}

const paymentIntentUpdateFail = id => {
  nock('https://api.stripe.com:443', { 'encodedQueryParams': true })
    .post(`/v1/payment_intents/${id}`)
    .reply(404, {
      error: {
        code: 'resource_missing',
        doc_url: 'https://stripe.com/docs/error-codes/resource-missing',
        message: 'No such payment_intent: abcdef',
        param: 'intent',
        type: 'invalid_request_error' }
    })
}

const mockStripe = {
  paymentSucceeded,
  paymentFailed,
  paymentIntentFound,
  paymentIntentNotFound,
  paymentIntentCreated,
  paymentIntentCreationFail,
  paymentIntentUpdated,
  paymentIntentUpdateFail
}

module.exports = {
  mockStripe
}
