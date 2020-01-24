const express = require('express');

const helmet = require('helmet');
const morgan = require('morgan');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();

//implement middleware
server.use(
  express.json(),
  helmet(),
  morgan('dev'),
  logger
);

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Middleware project is alive!!</h2>`);
});

//custom middleware
//Middleware to log requests to console
function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.url} at ${new Date().toISOString()}`);
  next();
}


module.exports = server;
