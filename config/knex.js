import url from 'url';

const conn = url.parse(process.env.POSTGRES_URL);
const dbConnection = {
  user: conn.auth.split(':')[0],
  password: conn.auth.split(':')[1],
  host: conn.hostname,
  database: conn.pathname.slice(1),
  port: conn.port || 5455,
  ssl: false
};

export default {
  options : {
    $filter: 'env',
    development: {
      debug: true,
      client: 'pg',
      connection: dbConnection
    },
    production: {
      debug: false,
      client: 'pg',
      connection: dbConnection
    }
  }
}
