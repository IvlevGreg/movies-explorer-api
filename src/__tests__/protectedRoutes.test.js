import { request } from './endpoint';
import { PROTECTED_ROUTES } from './fixtures/constants/ROUTES';
import { messageDefinedInBody } from './fixtures/utils';

describe.each(PROTECTED_ROUTES)('WHEN protected routes called', ({ route, method }) => {
  it(
    `Method "${method.toUpperCase()} ${route}" MUST return 401 status and error message in body"`,
    () => request[method](route)
      .then((res) => {
        expect(res.status).toBe(401);
        messageDefinedInBody(res);
      }),
  );
});
