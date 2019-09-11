const nock = require('nock')

const config = require('configurations')
const { fakeFlights, fakeAlgoliaAirports } = require('./fakes')
const { randomNumber } = require('utils/helpers')

const fakeAlgoliaFlightsResponse = () => {
  const dataLength = randomNumber(1)(100)
  const total = randomNumber(1)(8000)
  return {
    hits: fakeFlights(dataLength)([]),
    nbHits: total,
    page: randomNumber(0)(total / 100),
    nbPages: Math.ceil(total / 100)
  }
}

const fakeAlgoliaAirportsResponse = () => {
  const results = randomNumber(0)(3)
  return {
    hits: fakeAlgoliaAirports(results, []),
    nbHits: results,
    page: 0,
    nbPages: 1
  }
}

const flightsFound = () => {
  nock(`https://${config.algolia.appId}-dsn.algolia.net:443`)
    .persist()
    .post(`/1/indexes/${config.algolia.index.flights}/query`)
    .reply(200, fakeAlgoliaFlightsResponse())
}

const airportsFound = () => {
  nock(`https://${config.algolia.appId}-dsn.algolia.net:443`)
    .persist()
    .post(`/1/indexes/${config.algolia.index.bookingApiAirports}/query`)
    .reply(200, fakeAlgoliaAirportsResponse())
}

const flightsNotFound = () => {
  nock(`https://${config.algolia.appId}-dsn.algolia.net:443`)
    .persist()
    .post(`/1/indexes/${config.algolia.index.flights}/query`)
    .reply(200, {
      hits: [],
      nbHits: 0,
      page: 0,
      nbPages: 0
    })
}

const airportsNotFound = () => {
  nock(`https://${config.algolia.appId}-dsn.algolia.net:443`)
    .persist()
    .post(`/1/indexes/${config.algolia.index.bookingApiAirports}/query`)
    .reply(200, {
      hits: [],
      nbHits: 0,
      page: 0,
      nbPages: 0
    })
}

const flights = {
  found: flightsFound,
  notFound: flightsNotFound
}

const airports = {
  found: airportsFound,
  notFound: airportsNotFound
}

module.exports = {
  airports,
  flights
}
