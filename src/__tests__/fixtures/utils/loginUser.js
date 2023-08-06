import { request } from '../../endpoint';
import { USER_DATA } from '../constants';

export const loginUser = () => {
  beforeAll(async () => {
    await request
      .post('/signin')
      .send(USER_DATA);
  });
};
