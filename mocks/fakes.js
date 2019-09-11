const faker = require('faker')
const moment = require('moment')

const { randomNumber, randomLetters } = require('utils/helpers')

const fakeOrgaSettings = handlePayments => {
  return {
    id: randomNumber(1)(100),
    sandbox: faker.random.boolean().toString(),
    handlePayments
  }
}

const fakeFlight = randomDate => price => {
  return {
    id: randomNumber(1)(9999),
    flight_number: `${randomLetters(2)}${randomNumber(1)(9999)}`,
    origin: randomLetters(3),
    origin_timezone: 'Europe/Paris',
    origin_city_name: faker.address.city(),
    origin_country_name: faker.address.country(),
    destination: randomLetters(3),
    destination_timezone: 'Europe/Vienna',
    destination_city_name: faker.address.city(),
    destination_country_name: faker.address.country(),
    available_seats: randomNumber(1)(99),
    organization_name: faker.company.companyName(),
    departure_date: moment(randomDate).unix(),
    arrival_date: moment(randomDate).add(randomNumber(1)(24), 'hours').unix(),
    airline: {
      name: faker.company.companyName(),
      iata_code: randomLetters(2)
    },
    min_price: price,
    online_price: Math.ceil(price * 1.05 + 10),
    luggage_options: [
      {
        weight: randomNumber(8)(32),
        quantity: 1,
        online_price: randomNumber(0)(99)
      }
    ]
  }
}

const fakeFlights = number => results => {
  const randomPrice = randomNumber(50)(999)
  const randomDate = faker.date.future(1)

  return results.length === number
    ? results
    : fakeFlights(number)([...results, fakeFlight(randomDate)(randomPrice)])
}

const fakeAlgoliaAirports = (count, results) => {
  return results.length === count
    ? results
    : fakeAlgoliaAirports(count, [
      ...results,
      {
        name: faker.address.streetName(),
        city_name: faker.address.city(),
        iata_code: randomLetters(3),
        iata_city_code: randomLetters(3),
        country_name: faker.address.country(),
        flag: faker.address.countryCode(),
        _geoloc: {
          lat: faker.address.latitude(),
          lng: faker.address.longitude()
        }
      }
    ]
    )
}

module.exports = {
  fakeOrgaSettings,
  fakeFlight,
  fakeFlights,
  fakeAlgoliaAirports
}
