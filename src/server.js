const mongoose = require('mongoose');
const app = require('./app');
const { MONGO_SERVER } = require('./utils/constants/MONGO_SERVER');

const port = process.env.PORT || 3000;

mongoose.connect(MONGO_SERVER)
  // eslint-disable-next-line no-console
  .then(() => console.log('Connected!'))
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    throw e;
  });

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
