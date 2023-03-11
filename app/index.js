const Server = require('./server');

const server = new Server();

const port = process.env.APP_PORT ?? 3000
server.start(port);
