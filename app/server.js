import Hapi from 'hapi';
import config from 'config';
import postHandler from 'app/utils/post-handler';
import dbErrors from 'app/utils/db-errors';

const serverConfig = config.get('/server');
const hapi = new Hapi.Server();

hapi.connection({ port: serverConfig.port, host: serverConfig.host });
hapi.register(require('hapi-auth-signed-cookie'), function() {
  hapi.auth.strategy('session', 'cookie', config.get('/session'));
});

// Response handlers
postHandler(hapi);
dbErrors(hapi);

export default hapi;
