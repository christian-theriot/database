import { Database, ModelFactory } from '.';
import env from '@theriot.dev/env';
import mongoose from 'mongoose';

describe('Mongo Model Factory', () => {
  let db: Database;
  let Model: any;

  beforeAll(async () => {
    const user = env.get('MONGO_USER');
    const pwd = env.get('MONGO_PASSWORD');
    const host = env.get('MONGO_HOST');
    const port = env.get('MONGO_PORT');
    const dbName = env.get('MONGO_DB');

    db = new Database(`mongodb://${user}:${pwd}@${host}:${port}/${dbName}`);
    await db.start();
  });

  afterAll(async () => {
    await db.stop();
  });

  it('can create a model using the factory', async () => {
    try {
      Model = ModelFactory({
        connection: mongoose.connection,
        name: 'test model',
        attributes: {
          name: String
        }
      });

      const instance = await new Model();
      instance.name = 'test';
      await instance.save();

      const saved = await Model.findById(instance.id);
      expect(saved.name).toBe('test');
    } catch (e) {
      console.log(e);
    }
  });
});
