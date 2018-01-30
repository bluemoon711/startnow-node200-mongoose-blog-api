const server = require('./app');

const port = process.env.PORT || 8080;

server.listen(port, function() {
  console.log('Server is listening on http://localhost:' + port);
});