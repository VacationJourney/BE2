// import server from './src/app.js';
const server = require('./src/app');

// server.listen().then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});