'use strict';
var url = require('url');

var postgres = url.parse(process.env.POSTGRES_URL);
var postgresConnection = {
  user: postgres.auth.split(':')[0],
  password: postgres.auth.split(':')[1],
  host: postgres.hostname,
  database: postgres.pathname.slice(1),
  port: postgres.port || 5432,
  ssl: false
};

module.exports = {
  options : {
    $filter: 'env',
    development: {
      debug: true,
      client: 'pg',
      connection: postgresConnection
    },
    production: {
      debug: false,
      client: 'pg',
      connection: postgresConnection
    }
  }
};
