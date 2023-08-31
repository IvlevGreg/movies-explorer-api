import mongoose from 'mongoose';
import server from './server.js';
import { MONGO_SERVER } from './utils/constants/MONGO_SERVER';

const port = process.env.PORT || 4000;

mongoose.connect(MONGO_SERVER)
  // eslint-disable-next-line no-console
  .then(() => console.log('Connected!'))
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    throw e;
  });

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
