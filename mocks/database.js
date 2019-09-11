const { Fakes } = require('@citizenplane/yggdrasil')
const mockDB = require('mock-knex')
const tracker = mockDB.getTracker()

const config = require('configurations')

const install = () => tracker.install()
const uninstall = () => tracker.uninstall()

const customerFound = () => tracker.on('query', query => {
  query.response([{
    id: 2,
    name: 'customer',
    email: 'customer@mail.com'
  }])
})

const customerNotFound = () => tracker.on('query', query => {
  query.response([])
})

const createBookingSuccess = (data) => tracker.on('query', (query, step) => {
  const customerQuery = data.customerCode ? [ () => query.response([ { id: 123 } ]) ] : []
  const pnrQuery = data.version === '1.1' ? [ () => query.response(undefined) ] : []

  const queries = [
    ...customerQuery,
    ...pnrQuery,
    () => query.response({
      id: 123,
      status: 'PENDING',
      seats: data.seats,
      flight_id: 456,
      effective_price: 789,
      min_price: 742
    })
  ]
  queries[step - 1]()
})

const createBookingRequestAborted = (data) => tracker.on('query', (query, step) => {
  const customerQuery = data.customerCode ? [ () => query.response([ { id: 123 } ]) ] : []
  const pnrQuery = data.version === '1.1' ? [ () => query.response(undefined) ] : []

  const queries = [
    ...customerQuery,
    ...pnrQuery,
    () => query.response({
      id: 123,
      status: 'ABORTED',
      seats: data.seats,
      flight_id: 456,
      effective_price: 789
    })
  ]
  queries[step - 1]()
})

const createBookingCustomerNotFound = (data) => tracker.on('query', (query, step) => {
  const queries = [
    () => query.response([]),
    () => query.response({
      id: 123,
      status: 'ABORTED',
      seats: data.seats,
      flight_id: 456,
      effective_price: 789
    })
  ]
  queries[step - 1]()
})

const mockDb = async (magnitude) => {
  try {
    const db = config.postgre
    const citizenFakes = new Fakes(magnitude)
    citizenFakes.seed()
    await citizenFakes.populate(db.url, db.user, db.password, db.db)
    return citizenFakes.all
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

const mockQuery = {
  install,
  uninstall,
  customerFound,
  customerNotFound,
  createBookingSuccess,
  createBookingRequestAborted,
  createBookingCustomerNotFound
}

module.exports = { mockDb, mockQuery }
