const envConfig = require('configurations')
const { somethingLike: like, eachLike } = require('@pact-foundation/pact').Matchers
const { requestPayload, bookingPayload } = require('./payloadSamples')
const { requestRes, bookingRes, getFlightRes } = require('./responseSamples')
const { encodeBasicAuth } = require('utils/helpers')
const ccFee = +envConfig.general.ccFee

const createRequest = () => ({
  uponReceiving: 'a call to create a booking request',
  withRequest: {
    method: 'POST',
    path: '/internal/requests',
    body: requestPayload,
    headers: {
      Authorization: encodeBasicAuth(
        envConfig.services.backend.username,
        envConfig.services.backend.password
      ),
      'Content-Type': 'application/json'
    }
  },
  willRespondWith: {
    status: 200,
    body: requestRes
  }
})

const createBookingWithCustomerCode = () => ({
  uponReceiving: 'a call to create a booking with customer code',
  state: 'customer code',
  withRequest: {
    method: 'POST',
    path: '/internal/bookings',
    body: bookingPayload,
    headers: {
      Authorization: encodeBasicAuth(
        envConfig.services.backend.username,
        envConfig.services.backend.password
      ),
      Accept: 'application/json'
    }
  },
  willRespondWith: {
    status: 200,
    body: bookingRes
  }
})

const createBookingWithCustomerData = () => ({
  uponReceiving: 'a call to create a booking with customer data',
  state: 'customer data',
  withRequest: {
    method: 'POST',
    path: '/internal/bookings',
    body: bookingPayload,
    headers: {
      Authorization: encodeBasicAuth(
        envConfig.services.backend.username,
        envConfig.services.backend.password
      ),
      Accept: 'application/json'
    }
  },
  willRespondWith: {
    status: 200,
    body: bookingRes
  }
})

const formatFlightsResponse = luggage => {
  return {
    ...getFlightRes,
    luggage_options: luggage.map(luggage => ({ ...luggage, online_price: luggage.price / (1 + ccFee) }))
  }
}

const getFlight = (luggage, ids) => ({
  uponReceiving: 'a call to get a flight',
  state: `request ${ids}`,
  withRequest: {
    method: 'GET',
    path: like('/internal/flights/7500'),
    headers: {
      Authorization: encodeBasicAuth(
        envConfig.services.backend.username,
        envConfig.services.backend.password
      ),
      Accept: 'application/json'
    }
  },
  willRespondWith: {
    status: 200,
    body: like(formatFlightsResponse(luggage))
  }
})

const getRoutes = () => ({
  uponReceiving: 'a call to list routes',
  withRequest: {
    method: 'GET',
    path: '/internal/flights/routes',
    headers: {
      Authorization: encodeBasicAuth(
        envConfig.services.backend.username,
        envConfig.services.backend.password
      ),
      Accept: 'application/json'
    }
  },
  willRespondWith: {
    status: 200,
    body: {
      results: eachLike('SDQ-MXP'),
      total: like(8)
    }
  }
})

module.exports = {
  getFlight,
  getRoutes,
  createBookingWithCustomerCode,
  createBookingWithCustomerData,
  createRequest
}
