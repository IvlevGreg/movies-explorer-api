// endpoint.test.js
import supertest from 'supertest';

import server from '../server';

export const request = supertest(server);
