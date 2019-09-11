const { somethingLike: like, eachLike } = require('@pact-foundation/pact').Matchers

const requestPayload = {
  sandbox: like('true'),
  flight_id: like(20468),
  customer: {
    id: like(38),
    name: like('kiwi')
  },
  third_party: like({
    id: 62,
    name: 'pyton'
  }),
  passengers: like({
    adults: 1,
    children: 0,
    infants: 0
  })
}

const bookingPayloadWithCard = {
  'flight_id': like(20384),
  'request_id': like(372),
  'pnr_reference': like('CP5j81'),
  'customer_code': like('kiwi'),
  'first_name': like('Philippe'),
  'last_name': like('Poutou'),
  'email': like('linternationale@gmail.com'),
  'phonenumber': like('+33619435268'),
  'address': like('26 rue de Lappe'),
  'effective_price': like(129),
  'effective_infant_price': like(33),
  'city_name': like('Paris'),
  'country_code': like('FR'),
  'postal_code': like('75011'),
  'passenger_count': like(2),
  'infant_count': like(0),
  'passengers': eachLike({
    'first_name': 'Philippe',
    'middle_name': 'Jacques',
    'last_name': 'Poutou',
    'gender': 'male',
    'date_of_birth': '1959-06-21',
    'is_infant': false,
    'birth_country': 'France',
    'passport_number': '11AV17666',
    'passport_expiry_date': '2020-08-04',
    'passport_country_of_issue': 'France',
    'nationality': 'French'
  }),
  'luggages': eachLike({
    'weight': 18,
    'quantity': 1,
    'effective_price': 12.1
  }),
  'psp_id': like('117'),
  'third_parties': [{
    'id': like(62),
    'data': {
      external_id: like('KEBZH')
    }
  },
  {
    'id': like('117'),
    'data': {
      'fee': like(3.50),
      'charge_id': like('ch_1FBf48CLoBt04Rh8xRYdGxDX'),
      'source_id': like('card_1FBf47CLoBt04Rh8deX9AyVS'),
      'source_country': like('FR')
    }
  }],
  additional_fee: like(25.56),
  gender: like('male')
}

const bookingPayloadWithPaymentIntent = {
  'flight_id': like(20384),
  'request_id': like(372),
  'pnr_reference': like('CP5j81'),
  'customer_data': {
    first_name: like('name'),
    last_name: like('name'),
    gender: null,
    email: 'email',
    phonenumber: 'number'
  },
  'first_name': like('Philippe'),
  'last_name': like('Poutou'),
  'email': like('linternationale@gmail.com'),
  'phonenumber': like('+33619435268'),
  'address': like('26 rue de Lappe'),
  'effective_price': like(129),
  'effective_infant_price': like(33),
  'city_name': like('Paris'),
  'country_code': like('FR'),
  'postal_code': like('75011'),
  'passenger_count': like(2),
  'infant_count': like(0),
  'passengers': eachLike({
    'first_name': 'Philippe',
    'middle_name': 'Jacques',
    'last_name': 'Poutou',
    'gender': 'male',
    'date_of_birth': '1959-06-21',
    'is_infant': false,
    'birth_country': 'France',
    'passport_number': '11AV17666',
    'passport_expiry_date': '2020-08-04',
    'passport_country_of_issue': 'France',
    'nationality': 'French'
  }),
  'luggages': eachLike({
    'weight': 18,
    'quantity': 1,
    'effective_price': 12.1
  }),
  'psp_id': like('117'),
  'third_parties': [{
    'id': like(62),
    'data': {
      external_id: like('KEBZH')
    }
  },
  {
    'id': like('117'),
    'data': {
      'fee': like(3.50),
      'charge_id': like('ch_1FBf48CLoBt04Rh8xRYdGxDX'),
      'source_country': like('FR')
    }
  }],
  additional_fee: like(25.56),
  gender: like('male')
}

module.exports = {
  requestPayload,
  bookingPayloadWithCard,
  bookingPayloadWithPaymentIntent
}
