const express = require('express');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const createCustomErrors = require('./middlewares/createCustomErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const { bruteforceAll } = require('./utils/bruteForce');

require('dotenv').config();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000',
    'https://blogogram.nomoreparties.sbs'],
  credentials: true,
}));

app.use(express.json({ limit: '50kb' })); // body-parser defaults to a body size limit of 100kb

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use(helmet());

app.use('/', bruteforceAll.prevent, routes);

app.use(errorLogger);
app.use(errors());
app.use(createCustomErrors);
app.use(errorHandler);

module.exports = app;
