// endpoint.test.js
import supertest from 'supertest';

import server from '../server.js';

export const request = supertest(server);
