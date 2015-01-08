'use strict';
var env = process.env;

var postgresConnection = {
  user: env.POSTGRES_USER,
  port: 5432,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DATABASE,
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
