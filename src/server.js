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

const server = express();

server.use(cors({
  origin: ['http://localhost:3000',
    'http://greg.nomoredomainsicu.ru',
    'https://greg.nomoredomainsicu.ru'],
  credentials: true,
}));

server.use(express.json({ limit: '50kb' })); // body-parser defaults to a body size limit of 100kb

server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

server.use(requestLogger);

server.use(helmet());

server.use('/', bruteforceAll.prevent, routes);

server.use(errorLogger);
server.use(errors());
server.use(createCustomErrors);
server.use(errorHandler);

export default server;
