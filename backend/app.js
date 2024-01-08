require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors')

const { PORT, DB_HOST, DB_PORT, DB_NAME } = require('./config').config
const { APIError } = require('./errors/APIError')

const app = express();

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

app.use(cors)
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(requestLogger);
app.use('/', require('./routes'))
app.use(errorLogger);

app.use(errors());
app.use((err, req, res, next) => APIError(req, res, err, next));

app.listen(PORT, () => {});
