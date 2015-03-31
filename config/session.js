const {env} = process;

export default {
  password: env.COOKIE_PASS || 'this is very insecure, lol',
  cookie: 'session',
  isSecure: false,
  isHttpOnly: false
}
