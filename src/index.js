const server = require('./server');

if (process.env.NODE_ENV === 'production') {
  server.start();
} else {
  server.dev();
} 