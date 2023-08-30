import express from 'express';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler';
import createCustomErrors from './middlewares/createCustomErrors';
import { requestLogger, errorLogger } from './middlewares/logger';
import routes from './routes';
import { bruteforceAll } from './utils/bruteForce';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000',
    'http://greg.nomoredomainsicu.ru',
    'https://greg.nomoredomainsicu.ru'],
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

export default app;
