const { request } = require('./endpoint');
const { PROTECTED_ROUTES } = require('./constants/ROUTES');
const { messageDefinedInBody } = require('./utils');

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
