import { request } from '../../endpoint';
import { USER_DATA } from '../constants';

export const signupUser = () => {
  beforeAll(async () => {
    await request
      .post('/signup')
      .send(USER_DATA);
  });
};
