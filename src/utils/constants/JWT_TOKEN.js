import { IS_PRODUCTION } from './IS_PRODUCTION';

export const JWT_TOKEN = IS_PRODUCTION ? process.env.JWT_SECRET : 'super-strong-secret';
