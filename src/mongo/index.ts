import mongoose from "mongoose";
import { Store } from "express-session";
import MongoStore from "connect-mongo";

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
        mongoUrl: this._CONNECTION_URL,
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
