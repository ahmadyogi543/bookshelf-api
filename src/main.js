import Hapi from '@hapi/hapi';

import routes from './routes.js';

const config = {
  host: 'localhost',
  port: 9000,
};

const server = Hapi.server({
  host: config.host,
  port: config.port,
  routes: {
    cors: {
      origin: ['*'],
    },
  },
});
server.route(routes);

server.start().then(() => {
  console.log(`Server berjalan pada ${server.info.uri}`);
});
