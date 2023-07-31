const { IS_PRODUCTION } = require('./IS_PRODUCTION');

const JWT_TOKEN = IS_PRODUCTION ? process.env.JWT_SECRET : 'super-strong-secret';

module.exports = { JWT_TOKEN };
