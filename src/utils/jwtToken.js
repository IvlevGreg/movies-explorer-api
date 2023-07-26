const { IS_PRODUCTION } = require('./IS_PRODUCTION');

const jwtToken = IS_PRODUCTION ? process.env.JWT_SECRET : 'super-strong-secret';

module.exports = { jwtToken };
