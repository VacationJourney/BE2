require('@babel/register');

const server = require('../../src/app');

module.exports = async () => {
  global.httpServer = server;
  await global.httpServer.listen();
};