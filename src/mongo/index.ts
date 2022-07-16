import mongoose, { Connection, Schema } from 'mongoose';
import { Store } from 'express-session';
import MongoStore from 'connect-mongo';

export class Database {
  private _CONNECTION_URL: string;
  private _STORE?: Store;

  constructor(connectionURL: string) {
    this._CONNECTION_URL = connectionURL;
  }

  get mongo() {
    return mongoose;
  }

  get store() {
    if (!this._STORE) {
      this._STORE = MongoStore.create({
        mongoUrl: this._CONNECTION_URL
      });
    }

    return this._STORE;
  }

  async start() {
    await mongoose.connect(this._CONNECTION_URL);
  }

  async stop() {
    await mongoose.disconnect();
  }
}

export const ModelFactory = <
  Attributes = { [key: string]: any },
  Options = { [key: string]: any }
>({
  connection,
  name,
  attributes,
  options
}: {
  connection: typeof mongoose;
  name: string;
  attributes?: Attributes;
  options?: Options;
}) => {
  const schema = new Schema(attributes, options);

  return connection.model(name, schema);
};
