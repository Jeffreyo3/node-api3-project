const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();


//implement middleware
server.use(
  express.json(),
  helmet(),
  morgan('dev'),
  logger
);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.url} at ${new Date().toISOString()}`);
  next();
}


module.exports = server;
