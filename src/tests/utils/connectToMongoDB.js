const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const connectToMongoDBBeforeAll = () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
};

const connectToMongoDBBeforeEach = () => {
  beforeEach(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterEach(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
};

module.exports = {
  connectToMongoDBBeforeAll,
  connectToMongoDBBeforeEach,
};
