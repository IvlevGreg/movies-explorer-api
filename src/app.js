const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./middlewares/errorHandler');
const createCustomErrors = require('./middlewares/createCustomErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const { bruteforceAll } = require('./utils/bruteForce');
const { MONGO_SERVER } = require('./utils/constants/MONGO_SERVER');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:3000',
    'https://blogogram.nomoreparties.sbs'],
  credentials: true,
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use(helmet());

app.use('/', bruteforceAll.prevent, routes);

app.use(errorLogger);
app.use(errors());
app.use(createCustomErrors);
app.use(errorHandler);

mongoose.connect(MONGO_SERVER)
// eslint-disable-next-line no-console
  .then(() => console.log('Connected!'))
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    throw e;
  });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
