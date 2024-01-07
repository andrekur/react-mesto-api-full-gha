require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_HOST, DB_PORT, DB_NAME } = require('./config').config
const { APIError } = require('./errors/APIError')

const app = express();

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000'
];

app.use(function(req, res, next) {
  const { origin } = req.headers;
  const { method } = req;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      return res.end();
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(requestLogger);
app.use('/', require('./routes'))
app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => APIError(req, res, err, next));

app.listen(PORT, () => {});
