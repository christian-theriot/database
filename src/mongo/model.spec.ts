import { ModelFactory } from '.';
import mongoose from 'mongoose';

describe('Mongo Model Factory', () => {
  let Model: any;

  it('can create a model using the factory', async () => {
    jest
      .spyOn(mongoose.connection, 'model')
      .mockImplementationOnce(() => ({} as any));

    Model = ModelFactory({
      connection: mongoose.connection,
      name: 'test model',
      attributes: {
        name: String
      }
    });

    expect(Model).toBeDefined();
    expect(mongoose.connection.model).toHaveBeenCalled();
  });
});
