import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

export const connectToMongoDBBeforeAll = () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
};

export const connectToMongoDBBeforeEach = () => {
  beforeEach(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterEach(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
};
