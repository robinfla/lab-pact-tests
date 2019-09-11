const { somethingLike: like } = require('@pact-foundation/pact').Matchers

const getFlightRes = {
  'created_at': '2019-05-14T15:14:08.421Z',
  'updated_at': '2019-05-27T08:20:01.536Z',
  'id': 49072,
  'organization_id': 82,
  'origin_id': 282,
  'destination_id': 142,
  'via_airport_id': null,
  'parent_id': null,
  'child_id': null,
  'flight_type': 'Charter',
  'flight_number': 'EI429',
  'airline_id': 76,
  'aircraft_id': null,
  'luggage_options': [
    {
      'weight': 20,
      'quantity': 1,
      'min_price': 40,
      'online_price': 46
    }
  ],
  'departure_date': '2019-05-29T08:20:00.000Z',
  'arrival_date': '2019-05-29T11:15:00.000Z',
  'start_selling_date': '2019-05-13T23:00:00.000Z',
  'end_selling_date': '2019-05-27T08:20:00.000Z',
  'origin_terminal': {},
  'destination_terminal': {
    'label': 'Terminal 2',
    'terminal_code': '2'
  },
  'min_price': '75.00',
  'tmp_price': null,
  'online_price': '92.00',
  'included_vat': '0.20',
  'available_seats': 6,
  'status': 'CLOSED',
  'need_apis': false,
  'requests': [],
  'lifecycle': [
    {
      'key': 'PENDING',
      'value': '2019-05-14T15:14:08.421+00:00'
    },
    {
      'key': 'OPEN',
      'value': [
        {
          'name': 'tf-sync',
          'active': true,
          'synced': 'success',
          'updated_at': '2019-05-14T15:14:08.421+00:00'
        },
        {
          'name': 'booking-api',
          'active': true,
          'synced': 'success',
          'updated_at': '2019-05-14T15:14:08.421+00:00'
        }
      ]
    },
    {
      'key': 'CLOSED',
      'value': [
        {
          'name': 'tf-sync',
          'active': true,
          'synced': 'success',
          'updated_at': '2019-05-27T08:20:01.536+00:00'
        },
        {
          'name': 'booking-api',
          'active': true,
          'synced': 'success',
          'updated_at': '2019-05-27T08:20:01.536+00:00'
        }
      ]
    },
    {
      'key': 'CANCELED',
      'value': []
    }
  ],
  'schedule_changed': false,
  'availableSeatsWithRequests': 6
}

const requestRes = like({
  'flight_id': 20384,
  'third_party_id': 62,
  'customer_id': 38,
  'seats': 2,
  'effective_price': 129.54,
  'min_price': 113.22,
  'created_at': '2019-03-04T16:44:31.382Z',
  'id': 372,
  'thirdPartyName': 'Pyton',
  'customerName': 'kiwi',
  'flight': {
    'updated_at': '2019-03-04T16:44:31.470Z',
    'id': 20384,
    'organization_id': 1,
    'origin_id': 122,
    'destination_id': 79,
    'via_airport_id': null,
    'airline_id': 37,
    'aircraft_id': null,
    'flight_type': 'Charter',
    'flight_number': 'SN9876',
    'departure_date': '2019-05-30T05:00:00.000Z',
    'arrival_date': '2019-05-30T13:00:00.000Z',
    'origin_terminal': {},
    'destination_terminal': {},
    'min_price': '111.00',
    'online_price': '127.00',
    'available_seats': 7,
    'status': 'OPEN',
    'created_at': '2018-10-09T13:16:16.694Z',
    'start_selling_date': '2018-10-08T22:00:00.000Z',
    'end_selling_date': '2019-05-28T05:00:00.000Z',
    'parent_id': null,
    'child_id': null,
    'schedule_change_details': null,
    'need_apis': false,
    'luggage_options': [
      {
        'weight': 18,
        'quantity': 1,
        'min_price': 0,
        'online_price': 0
      }
    ],
    'included_vat': '0.00',
    'via_airport': null,
    'organization': {
      'id': 1,
      'name': 'DEMO',
      'email': 'welcome@citizenplane.com',
      'phonenumber': null,
      'logo': null,
      'address': null,
      'postal_code': null,
      'city_name': null,
      'country_name': null,
      'fare_id': 1,
      'created_at': '2018-02-28T18:29:31.218Z',
      'updated_at': '2019-01-14T13:13:51.990Z',
      'registration_number': null,
      'vat_number': null,
      'iban': null,
      'settings': [
        {
          'key': 'distribution_engines',
          'value': [
            {
              'name': 'tf-sync',
              'active': false,
              'reseller_id': 20
            }
          ]
        },
        {
          'key': 'citizenplane_ftp_credentials',
          'value': {
            'type': 'Push',
            'password': '6rhhvpot',
            'username': 'ftp-user-1'
          }
        }
      ],
      'bic': null,
      'type': 'SUPPLIER',
      'fare': {
        'id': 1,
        'name': 'default',
        'currency': 'EUR',
        'created_at': '2018-02-28T18:29:06.764Z',
        'updated_at': '2018-12-03T14:09:29.638Z',
        'markup': '10.00',
        'percent_fee': '0.05',
        'luggage_markup': 5,
        'luggage_percent_fee': 0
      }
    },
    'origin': {
      'id': 122,
      'iata_code': 'DLM',
      'country_name': 'Turkey',
      'city_name': 'Dalaman',
      'flag': 'TR',
      'timezone': 'Europe/Istanbul',
      'lat': '36.71666700',
      'lng': '28.78333300',
      'terminals': [],
      'created_at': '2018-06-01T08:41:54.928Z',
      'updated_at': '2019-01-25T17:25:03.050Z'
    },
    'destination': {
      'id': 79,
      'iata_code': 'BRU',
      'country_name': 'Belgium',
      'city_name': 'Brussels',
      'flag': 'BE',
      'timezone': 'Europe/Brussels',
      'lat': '50.89717000',
      'lng': '4.48360200',
      'terminals': [],
      'created_at': '2018-04-06T11:41:39.771Z',
      'updated_at': '2019-02-20T08:40:15.094Z'
    },
    'airline': {
      'id': 37,
      'name': 'Brussels Airlines',
      'iata_code': 'SN',
      'created_at': '2018-04-17T17:03:44.225Z',
      'updated_at': '2019-02-25T18:35:02.426Z'
    },
    'requests': [
      {
        'id': 372,
        'flight_id': 20384,
        'effective_price': '129.54',
        'seats': 2,
        'status': 'PENDING',
        'created_at': '2019-03-04T16:44:31.382Z',
        'updated_at': '2019-03-04T16:44:31.384Z',
        'min_price': '113.22',
        'booking_id': null,
        'customer_id': 38,
        'third_party_id': 62
      }
    ],
    'bookings': [
      {
        'id': 26516,
        'flight_id': 20384,
        'effective_price': '129.54',
        'effective_markup': '16.32',
        'first_name': 'philiii',
        'last_name': 'iiipe',
        'gender': 'male',
        'email': 'phil@ippe.com',
        'phonenumber': '+33619435268',
        'address': '19 rue de la cachette',
        'postal_code': '75000',
        'city_name': 'paris',
        'country_code': 'fr',
        'passenger_count': 2,
        'passengers': [
          {
            'gender': 'male',
            'is_infant': false,
            'last_name': 'iiipe',
            'first_name': 'philiii',
            'nationality': 'french',
            'birth_country': 'france',
            'date_of_birth': '1992-06-21',
            'passport_number': '11av17666',
            'passport_expiry_date': '2020-08-04',
            'passport_country_of_issue': 'france'
          },
          {
            'gender': 'female',
            'is_infant': false,
            'last_name': 'kejtebute',
            'first_name': 'violetta',
            'date_of_birth': '1998-04-15'
          }
        ],
        'status': 'SOLD',
        'created_at': '2019-03-04T16:07:05.893Z',
        'updated_at': '2019-03-04T16:07:05.894Z',
        'reseller_invoice_id': null,
        'supplier_invoice_id': null,
        'reseller_fields': null,
        'distribution_channel': null,
        'refunded_amount': null,
        'refunded_date': null,
        'refunded_details': null,
        'request_id': 371,
        'infant_count': 0,
        'effective_infant_price': '33.97',
        'pnr_reference': 'CPY97689K',
        'luggages': [
          {
            'weight': 18,
            'quantity': 1,
            'effective_price': 0,
            'effective_markup': 0
          },
          {
            'weight': 18,
            'quantity': 1,
            'effective_price': 0,
            'effective_markup': 0
          }
        ],
        'items': [
          {
            'id': 11337,
            'amount': 259.08,
            'markup': 32.64,
            'currency': 'eur',
            'label': 'Booking',
            'type': 'ORDER',
            'details': null,
            'data': [
              {
                'key': 'passengers',
                'value': {
                  'price': 129.54,
                  'markup': 16.32,
                  'quantity': 2
                }
              },
              {
                'key': 'infants',
                'value': {
                  'price': 33.97,
                  'markup': 0,
                  'quantity': 0
                }
              },
              {
                'key': 'luggage',
                'value': [
                  {
                    'price': 0,
                    'markup': 0,
                    'weight': 18,
                    'quantity': 2
                  }
                ]
              }
            ],
            'booking_id': 26516,
            'customer_id': 40,
            'invoice_id': null,
            'created_at': '2019-03-04T16:07:05.900Z',
            'updated_at': '2019-03-04T16:07:05.901Z',
            'psp_id': 117,
            'parent_id': null,
            'tags': null,
            'transactions': [
              {
                'id': 38503,
                'amount': 0,
                'currency': 'eur',
                'item_id': 11337,
                'report_id': null,
                'organization_id': 62,
                'data': {
                  'id': 'WOHRFSIG'
                },
                'created_at': '2019-03-04T16:07:05.906Z',
                'updated_at': '2019-03-04T16:07:05.907Z'
              },
              {
                'id': 38504,
                'amount': 7.76,
                'currency': 'eur',
                'item_id': 11337,
                'report_id': null,
                'organization_id': 117,
                'data': {
                  'fee': 7.76
                },
                'created_at': '2019-03-04T16:07:05.906Z',
                'updated_at': '2019-03-04T16:07:05.907Z'
              },
              {
                'id': 38505,
                'amount': 226.44,
                'currency': 'eur',
                'item_id': 11337,
                'report_id': null,
                'organization_id': 1,
                'data': null,
                'created_at': '2019-03-04T16:07:05.906Z',
                'updated_at': '2019-03-04T16:07:05.907Z'
              },
              {
                'id': 38506,
                'amount': 24.88,
                'currency': 'eur',
                'item_id': 11337,
                'report_id': null,
                'organization_id': 23,
                'data': null,
                'created_at': '2019-03-04T16:07:05.906Z',
                'updated_at': '2019-03-04T16:07:05.907Z'
              }
            ],
            'publicAmount': 226.44,
            'publicData': [
              {
                'key': 'passengers',
                'value': {
                  'price': 113.22,
                  'quantity': 2
                }
              },
              {
                'key': 'infants',
                'value': {
                  'price': 33.97,
                  'quantity': 0
                }
              },
              {
                'key': 'luggage',
                'value': [
                  {
                    'price': 0,
                    'weight': 18,
                    'quantity': 2
                  }
                ]
              }
            ]
          }
        ],
        'effectivePublicPrice': 113.22,
        'publicLuggage': [
          {
            'weight': 18,
            'quantity': 2,
            'price': 0,
            'markup': 0,
            'publicPrice': 0
          }
        ],
        'totalAmount': 259.08,
        'publicTotalAmount': 226.44
      }
    ],
    'parent': null,
    'availableSeatsWithRequests': 5
  }
})

const bookingRes = like({
  'booking': {
    'id': 26517,
    'flight_id': 20384,
    'effective_price': '129.54',
    'effective_markup': '16.32',
    'first_name': 'philippe',
    'last_name': 'poutou',
    'gender': 'male',
    'email': 'linternationale@gmail.com',
    'phonenumber': '+33619435268',
    'address': '26 rue de lappe',
    'postal_code': '75011',
    'city_name': 'paris',
    'country_code': 'fr',
    'passenger_count': 2,
    'passengers': [
      {
        'gender': 'male',
        'is_infant': false,
        'last_name': 'poutou',
        'first_name': 'philippe',
        'nationality': 'french',
        'birth_country': 'france',
        'date_of_birth': '1959-06-21',
        'passport_number': '11av17666',
        'passport_expiry_date': '2020-08-04',
        'passport_country_of_issue': 'france'
      },
      {
        'gender': 'female',
        'is_infant': false,
        'last_name': 'duchamp',
        'first_name': 'marie',
        'date_of_birth': '1995-04-15'
      }
    ],
    'status': 'SOLD',
    'created_at': '2019-03-04T17:04:02.272Z',
    'updated_at': '2019-03-04T17:04:02.273Z',
    'reseller_invoice_id': null,
    'supplier_invoice_id': null,
    'reseller_fields': null,
    'distribution_channel': null,
    'refunded_amount': null,
    'refunded_date': null,
    'refunded_details': null,
    'request_id': 372,
    'infant_count': 0,
    'effective_infant_price': '33.97',
    'pnr_reference': 'CPD3B7CWK',
    'luggages': [
      {
        'weight': 18,
        'quantity': 1,
        'effective_price': 0,
        'effective_markup': 0
      },
      {
        'weight': 18,
        'quantity': 1,
        'effective_price': 0,
        'effective_markup': 0
      }
    ],
    'items': [
      {
        'id': 11338,
        'amount': 259.08,
        'markup': 32.64,
        'currency': 'eur',
        'label': 'Booking',
        'type': 'ORDER',
        'details': null,
        'data': [
          {
            'key': 'passengers',
            'value': {
              'price': 129.54,
              'markup': 16.32,
              'quantity': 2
            }
          },
          {
            'key': 'infants',
            'value': {
              'price': 33.97,
              'markup': 0,
              'quantity': 0
            }
          },
          {
            'key': 'luggage',
            'value': [
              {
                'price': 0,
                'markup': 0,
                'weight': 18,
                'quantity': 2
              }
            ]
          }
        ],
        'booking_id': 26517,
        'customer_id': 38,
        'invoice_id': null,
        'created_at': '2019-03-04T17:04:02.281Z',
        'updated_at': '2019-03-04T17:04:02.282Z',
        'psp_id': 117,
        'parent_id': null,
        'tags': null,
        'transactions': [
          {
            'id': 38507,
            'amount': 0,
            'currency': 'eur',
            'item_id': 11338,
            'report_id': null,
            'organization_id': 62,
            'data': {},
            'created_at': '2019-03-04T17:04:02.288Z',
            'updated_at': '2019-03-04T17:04:02.289Z'
          },
          {
            'id': 38508,
            'amount': 3.5,
            'currency': 'eur',
            'item_id': 11338,
            'report_id': null,
            'organization_id': 117,
            'data': {
              'fee': 3.5
            },
            'created_at': '2019-03-04T17:04:02.288Z',
            'updated_at': '2019-03-04T17:04:02.289Z'
          },
          {
            'id': 38509,
            'amount': 226.44,
            'currency': 'eur',
            'item_id': 11338,
            'report_id': null,
            'organization_id': 1,
            'data': null,
            'created_at': '2019-03-04T17:04:02.288Z',
            'updated_at': '2019-03-04T17:04:02.289Z'
          },
          {
            'id': 38510,
            'amount': 29.14,
            'currency': 'eur',
            'item_id': 11338,
            'report_id': null,
            'organization_id': 23,
            'data': null,
            'created_at': '2019-03-04T17:04:02.288Z',
            'updated_at': '2019-03-04T17:04:02.289Z'
          }
        ],
        'publicAmount': 226.44,
        'publicData': [
          {
            'key': 'passengers',
            'value': {
              'price': 113.22,
              'quantity': 2
            }
          },
          {
            'key': 'infants',
            'value': {
              'price': 33.97,
              'quantity': 0
            }
          },
          {
            'key': 'luggage',
            'value': [
              {
                'price': 0,
                'weight': 18,
                'quantity': 2
              }
            ]
          }
        ]
      }
    ],
    'effectivePublicPrice': 113.22,
    'publicLuggage': [
      {
        'weight': 18,
        'quantity': 2,
        'price': 0,
        'markup': 0,
        'publicPrice': 0
      }
    ],
    'totalAmount': 259.08,
    'publicTotalAmount': 226.44
  },
  'flight': {
    'available_seats': 5,
    'updated_at': '2019-03-04T17:04:02.359Z',
    'id': 20384,
    'organization_id': 1,
    'origin_id': 122,
    'destination_id': 79,
    'via_airport_id': null,
    'airline_id': 37,
    'aircraft_id': null,
    'flight_type': 'Charter',
    'flight_number': 'SN9876',
    'departure_date': '2019-05-30T05:00:00.000Z',
    'arrival_date': '2019-05-30T13:00:00.000Z',
    'origin_terminal': {},
    'destination_terminal': {},
    'min_price': '111.00',
    'online_price': '127.00',
    'status': 'OPEN',
    'created_at': '2018-10-09T13:16:16.694Z',
    'start_selling_date': '2018-10-08T22:00:00.000Z',
    'end_selling_date': '2019-05-28T05:00:00.000Z',
    'parent_id': null,
    'child_id': null,
    'schedule_change_details': null,
    'need_apis': false,
    'luggage_options': [
      {
        'weight': 18,
        'quantity': 1,
        'min_price': 0,
        'online_price': 0
      }
    ],
    'included_vat': '0.00',
    'via_airport': null,
    'organization': {
      'id': 1,
      'name': 'DEMO',
      'email': 'welcome@citizenplane.com',
      'phonenumber': null,
      'logo': null,
      'address': null,
      'postal_code': null,
      'city_name': null,
      'country_name': null,
      'fare_id': 1,
      'created_at': '2018-02-28T18:29:31.218Z',
      'updated_at': '2019-01-14T13:13:51.990Z',
      'registration_number': null,
      'vat_number': null,
      'iban': null,
      'settings': [
        {
          'key': 'distribution_engines',
          'value': [
            {
              'name': 'tf-sync',
              'active': false,
              'reseller_id': 20
            }
          ]
        },
        {
          'key': 'citizenplane_ftp_credentials',
          'value': {
            'type': 'Push',
            'password': '6rhhvpot',
            'username': 'ftp-user-1'
          }
        }
      ],
      'bic': null,
      'type': 'SUPPLIER',
      'fare': {
        'id': 1,
        'name': 'default',
        'currency': 'EUR',
        'created_at': '2018-02-28T18:29:06.764Z',
        'updated_at': '2018-12-03T14:09:29.638Z',
        'markup': '10.00',
        'percent_fee': '0.05',
        'luggage_markup': 5,
        'luggage_percent_fee': 0
      }
    },
    'destination': {
      'id': 79,
      'iata_code': 'BRU',
      'country_name': 'Belgium',
      'city_name': 'Brussels',
      'flag': 'BE',
      'timezone': 'Europe/Brussels',
      'lat': '50.89717000',
      'lng': '4.48360200',
      'terminals': [],
      'created_at': '2018-04-06T11:41:39.771Z',
      'updated_at': '2019-02-20T08:40:15.094Z'
    },
    'airline': {
      'id': 37,
      'name': 'Brussels Airlines',
      'iata_code': 'SN',
      'created_at': '2018-04-17T17:03:44.225Z',
      'updated_at': '2019-02-25T18:35:02.426Z'
    },
    'origin': {
      'id': 122,
      'iata_code': 'DLM',
      'country_name': 'Turkey',
      'city_name': 'Dalaman',
      'flag': 'TR',
      'timezone': 'Europe/Istanbul',
      'lat': '36.71666700',
      'lng': '28.78333300',
      'terminals': [],
      'created_at': '2018-06-01T08:41:54.928Z',
      'updated_at': '2019-01-25T17:25:03.050Z'
    },
    'requests': [],
    'bookings': [
      {
        'id': 26516,
        'flight_id': 20384,
        'effective_price': '129.54',
        'effective_markup': '16.32',
        'first_name': 'philiii',
        'last_name': 'iiipe',
        'gender': 'male',
        'email': 'phil@ippe.com',
        'phonenumber': '+33619435268',
        'address': '19 rue de la cachette',
        'postal_code': '75000',
        'city_name': 'paris',
        'country_code': 'fr',
        'passenger_count': 2,
        'passengers': [
          {
            'gender': 'male',
            'is_infant': false,
            'last_name': 'iiipe',
            'first_name': 'philiii',
            'nationality': 'french',
            'birth_country': 'france',
            'date_of_birth': '1992-06-21',
            'passport_number': '11av17666',
            'passport_expiry_date': '2020-08-04',
            'passport_country_of_issue': 'france'
          },
          {
            'gender': 'female',
            'is_infant': false,
            'last_name': 'kejtebute',
            'first_name': 'violetta',
            'date_of_birth': '1998-04-15'
          }
        ],
        'status': 'SOLD',
        'created_at': '2019-03-04T16:07:05.893Z',
        'updated_at': '2019-03-04T16:07:05.894Z',
        'reseller_invoice_id': null,
        'supplier_invoice_id': null,
        'reseller_fields': null,
        'distribution_channel': null,
        'refunded_amount': null,
        'refunded_date': null,
        'refunded_details': null,
        'request_id': 371,
        'infant_count': 0,
        'effective_infant_price': '33.97',
        'pnr_reference': 'CPY97689K',
        'luggages': [
          {
            'weight': 18,
            'quantity': 1,
            'effective_price': 0,
            'effective_markup': 0
          },
          {
            'weight': 18,
            'quantity': 1,
            'effective_price': 0,
            'effective_markup': 0
          }
        ],
        'items': [
          {
            'id': 11337,
            'amount': 259.08,
            'markup': 32.64,
            'currency': 'eur',
            'label': 'Booking',
            'type': 'ORDER',
            'details': null,
            'data': [
              {
                'key': 'passengers',
                'value': {
                  'price': 129.54,
                  'markup': 16.32,
                  'quantity': 2
                }
              },
              {
                'key': 'infants',
                'value': {
                  'price': 33.97,
                  'markup': 0,
                  'quantity': 0
                }
              },
              {
                'key': 'luggage',
                'value': [
                  {
                    'price': 0,
                    'markup': 0,
                    'weight': 18,
                    'quantity': 2
                  }
                ]
              }
            ],
            'booking_id': 26516,
            'customer_id': 40,
            'invoice_id': null,
            'created_at': '2019-03-04T16:07:05.900Z',
            'updated_at': '2019-03-04T16:07:05.901Z',
            'psp_id': 117,
            'parent_id': null,
            'tags': null,
            'transactions': [
              {
                'id': 38503,
                'amount': 0,
                'currency': 'eur',
                'item_id': 11337,
                'report_id': null,
                'organization_id': 62,
                'data': {
                  'id': 'WOHRFSIG'
                },
                'created_at': '2019-03-04T16:07:05.906Z',
                'updated_at': '2019-03-04T16:07:05.907Z'
              },
              {
                'id': 38504,
                'amount': 7.76,
                'currency': 'eur',
                'item_id': 11337,
                'report_id': null,
                'organization_id': 117,
                'data': {
                  'fee': 7.76
                },
                'created_at': '2019-03-04T16:07:05.906Z',
                'updated_at': '2019-03-04T16:07:05.907Z'
              },
              {
                'id': 38505,
                'amount': 226.44,
                'currency': 'eur',
                'item_id': 11337,
                'report_id': null,
                'organization_id': 1,
                'data': null,
                'created_at': '2019-03-04T16:07:05.906Z',
                'updated_at': '2019-03-04T16:07:05.907Z'
              },
              {
                'id': 38506,
                'amount': 24.88,
                'currency': 'eur',
                'item_id': 11337,
                'report_id': null,
                'organization_id': 23,
                'data': null,
                'created_at': '2019-03-04T16:07:05.906Z',
                'updated_at': '2019-03-04T16:07:05.907Z'
              }
            ],
            'publicAmount': 226.44,
            'publicData': [
              {
                'key': 'passengers',
                'value': {
                  'price': 113.22,
                  'quantity': 2
                }
              },
              {
                'key': 'infants',
                'value': {
                  'price': 33.97,
                  'quantity': 0
                }
              },
              {
                'key': 'luggage',
                'value': [
                  {
                    'price': 0,
                    'weight': 18,
                    'quantity': 2
                  }
                ]
              }
            ]
          }
        ],
        'effectivePublicPrice': 113.22,
        'publicLuggage': [
          {
            'weight': 18,
            'quantity': 2,
            'price': 0,
            'markup': 0,
            'publicPrice': 0
          }
        ],
        'totalAmount': 259.08,
        'publicTotalAmount': 226.44
      },
      {
        'id': 26517,
        'flight_id': 20384,
        'effective_price': '129.54',
        'effective_markup': '16.32',
        'first_name': 'philippe',
        'last_name': 'poutou',
        'gender': 'male',
        'email': 'linternationale@gmail.com',
        'phonenumber': '+33619435268',
        'address': '26 rue de lappe',
        'postal_code': '75011',
        'city_name': 'paris',
        'country_code': 'fr',
        'passenger_count': 2,
        'passengers': [
          {
            'gender': 'male',
            'is_infant': false,
            'last_name': 'poutou',
            'first_name': 'philippe',
            'nationality': 'french',
            'birth_country': 'france',
            'date_of_birth': '1959-06-21',
            'passport_number': '11av17666',
            'passport_expiry_date': '2020-08-04',
            'passport_country_of_issue': 'france'
          },
          {
            'gender': 'female',
            'is_infant': false,
            'last_name': 'duchamp',
            'first_name': 'marie',
            'date_of_birth': '1995-04-15'
          }
        ],
        'status': 'SOLD',
        'created_at': '2019-03-04T17:04:02.272Z',
        'updated_at': '2019-03-04T17:04:02.273Z',
        'reseller_invoice_id': null,
        'supplier_invoice_id': null,
        'reseller_fields': null,
        'distribution_channel': null,
        'refunded_amount': null,
        'refunded_date': null,
        'refunded_details': null,
        'request_id': 372,
        'infant_count': 0,
        'effective_infant_price': '33.97',
        'pnr_reference': 'CPD3B7CWK',
        'luggages': [
          {
            'weight': 18,
            'quantity': 1,
            'effective_price': 0,
            'effective_markup': 0
          },
          {
            'weight': 18,
            'quantity': 1,
            'effective_price': 0,
            'effective_markup': 0
          }
        ],
        'items': [
          {
            'id': 11338,
            'amount': 259.08,
            'markup': 32.64,
            'currency': 'eur',
            'label': 'Booking',
            'type': 'ORDER',
            'details': null,
            'data': [
              {
                'key': 'passengers',
                'value': {
                  'price': 129.54,
                  'markup': 16.32,
                  'quantity': 2
                }
              },
              {
                'key': 'infants',
                'value': {
                  'price': 33.97,
                  'markup': 0,
                  'quantity': 0
                }
              },
              {
                'key': 'luggage',
                'value': [
                  {
                    'price': 0,
                    'markup': 0,
                    'weight': 18,
                    'quantity': 2
                  }
                ]
              }
            ],
            'booking_id': 26517,
            'customer_id': 38,
            'invoice_id': null,
            'created_at': '2019-03-04T17:04:02.281Z',
            'updated_at': '2019-03-04T17:04:02.282Z',
            'psp_id': 117,
            'parent_id': null,
            'tags': null,
            'transactions': [
              {
                'id': 38507,
                'amount': 0,
                'currency': 'eur',
                'item_id': 11338,
                'report_id': null,
                'organization_id': 62,
                'data': {},
                'created_at': '2019-03-04T17:04:02.288Z',
                'updated_at': '2019-03-04T17:04:02.289Z'
              },
              {
                'id': 38508,
                'amount': 3.5,
                'currency': 'eur',
                'item_id': 11338,
                'report_id': null,
                'organization_id': 117,
                'data': {
                  'fee': 3.5
                },
                'created_at': '2019-03-04T17:04:02.288Z',
                'updated_at': '2019-03-04T17:04:02.289Z'
              },
              {
                'id': 38509,
                'amount': 226.44,
                'currency': 'eur',
                'item_id': 11338,
                'report_id': null,
                'organization_id': 1,
                'data': null,
                'created_at': '2019-03-04T17:04:02.288Z',
                'updated_at': '2019-03-04T17:04:02.289Z'
              },
              {
                'id': 38510,
                'amount': 29.14,
                'currency': 'eur',
                'item_id': 11338,
                'report_id': null,
                'organization_id': 23,
                'data': null,
                'created_at': '2019-03-04T17:04:02.288Z',
                'updated_at': '2019-03-04T17:04:02.289Z'
              }
            ],
            'publicAmount': 226.44,
            'publicData': [
              {
                'key': 'passengers',
                'value': {
                  'price': 113.22,
                  'quantity': 2
                }
              },
              {
                'key': 'infants',
                'value': {
                  'price': 33.97,
                  'quantity': 0
                }
              },
              {
                'key': 'luggage',
                'value': [
                  {
                    'price': 0,
                    'weight': 18,
                    'quantity': 2
                  }
                ]
              }
            ]
          }
        ],
        'effectivePublicPrice': 113.22,
        'publicLuggage': [
          {
            'weight': 18,
            'quantity': 2,
            'price': 0,
            'markup': 0,
            'publicPrice': 0
          }
        ],
        'totalAmount': 259.08,
        'publicTotalAmount': 226.44
      }
    ],
    'parent': null,
    'availableSeatsWithRequests': 5
  },
  'neededThirdParties': {
    'vatFr': 110,
    'citizenplane': 23
  },
  'thirdParties': [
    {
      'id': 62,
      'data': {
        'external_id': '1234556'
      },
      'dbData': {
        'id': 62,
        'name': 'PYTON',
        'email': 'l.van.schaik@pyton.travel',
        'phonenumber': null,
        'logo': null,
        'address': null,
        'postal_code': null,
        'city_name': null,
        'country_name': null,
        'fare_id': 1,
        'created_at': '2018-07-06T15:10:53.491Z',
        'updated_at': '2018-07-07T18:23:22.923Z',
        'registration_number': null,
        'vat_number': null,
        'iban': null,
        'settings': [
          {
            'key': 'billing',
            'value': {
              'commission': 0,
              'percent_fee': 0
            }
          }
        ],
        'bic': null,
        'type': 'THIRDPARTY'
      },
      'billing': {
        'commission': 0,
        'percent_fee': 0
      }
    },
    {
      'id': 117,
      'data': {
        'fee': 3.5
      },
      'dbData': {
        'id': 117,
        'name': 'STRIPE PAYMENTS EUROPE, LTD',
        'email': 'support@stripe.com',
        'phonenumber': null,
        'logo': null,
        'address': '1 Grand Canal Street Lower',
        'postal_code': '2',
        'city_name': 'Dublin',
        'country_name': 'Ireland',
        'fare_id': 1,
        'created_at': '2019-02-22T09:21:47.812Z',
        'updated_at': '2019-02-22T09:21:47.812Z',
        'registration_number': null,
        'vat_number': 'IE3206488LH',
        'iban': null,
        'settings': [
          {
            'key': 'refund_policy',
            'value': {
              'allowed': true
            }
          },
          {
            'key': 'billing',
            'value': {
              'commission': 0,
              'percent_fee': 0
            }
          }
        ],
        'bic': null,
        'type': 'THIRDPARTY'
      },
      'billing': {
        'commission': 0,
        'percent_fee': 0
      }
    }
  ],
  'request': {
    'status': 'PROCESSED',
    'booking_id': 26517,
    'updated_at': '2019-03-04T17:04:02.322Z',
    'id': 372,
    'flight_id': 20384,
    'effective_price': '129.54',
    'seats': 2,
    'created_at': '2019-03-04T16:44:31.382Z',
    'min_price': '113.22',
    'customer_id': 38,
    'third_party_id': 62
  },
  'customer_id': 38,
  'customer': {
    'id': 38,
    'name': 'Kiwi',
    'email': 'ondrej.cikanek@kiwi.com',
    'is_company': true,
    'company_codes': [
      'kiwi'
    ],
    'verified': null,
    'phonenumber': '+420777652053',
    'gender': null,
    'address': 'Palachovo namesti 4\t',
    'postal_code': '625 00\t',
    'city_name': 'Brno',
    'country_code': null,
    'country_name': 'Czech Republic',
    'vat_number': null,
    'registration_number': '29352886',
    'created_at': '2019-02-15T14:52:45.974Z',
    'updated_at': '2019-02-15T14:52:45.974Z'
  },
  'effectiveMarkup': 16.32,
  'luggages': [
    {
      'weight': 18,
      'quantity': 1,
      'effective_price': 0,
      'effective_markup': 0
    },
    {
      'weight': 18,
      'quantity': 1,
      'effective_price': 0,
      'effective_markup': 0
    }
  ],
  'item': {
    'customer_id': 38,
    'psp_id': 117,
    'label': 'Booking',
    'amount': 259.08,
    'markup': 32.64,
    'currency': 'eur',
    'data': [
      {
        'key': 'passengers',
        'value': {
          'quantity': 2,
          'price': 129.54,
          'markup': 16.32
        }
      },
      {
        'key': 'infants',
        'value': {
          'quantity': 0,
          'price': 33.97,
          'markup': 0
        }
      },
      {
        'key': 'luggage',
        'value': [
          {
            'weight': 18,
            'quantity': 2,
            'price': 0,
            'markup': 0
          }
        ]
      }
    ]
  },
  'vatAmount': 0,
  'transactions': [
    {
      'organization_id': 62,
      'amount': 0,
      'currency': 'eur',
      'data': {}
    },
    {
      'organization_id': 117,
      'amount': 3.5,
      'currency': 'eur',
      'data': {
        'fee': 3.5
      }
    },
    {
      'organization_id': 1,
      'amount': 226.44,
      'currency': 'eur'
    },
    {
      'organization_id': 23,
      'amount': 29.139999999999986,
      'currency': 'eur'
    }
  ],
  'invoice': {
    'status': 'PAID',
    'designation': 'Booking',
    'currency': 'eur',
    'amount': 259.08,
    'issuer_id': '23',
    'recipient_id': 38,
    'items': [
      {
        'id': 11338,
        'pnr_ref': 'CPD3B7CWK',
        'flight_number': 'SN9876',
        'amount': 259.08,
        'currency': 'eur',
        'details': '(*)\npassengers: price: 129.54, quantity: 2\ninfants: price: 33.97, quantity: 0\nluggage: price: 0, weight: 18, quantity: 2'
      }
    ]
  }
})

module.exports = {
  requestRes,
  bookingRes,
  getFlightRes
}
