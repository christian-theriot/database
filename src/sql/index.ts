import {
  Sequelize,
  Model as SQLModel,
  ModelAttributes,
  InitOptions
} from 'sequelize';
import { Store } from 'express-session';
import connect from 'connect-session-sequelize';

export * from 'sequelize';

const SQLStore = connect(Store);

export class Database {
  private _SEQUELIZE: Sequelize;
  private _STORE: Store;

  constructor(connectionURL: string) {
    this._SEQUELIZE = new Sequelize(connectionURL, { logging: false });
    this._STORE = new SQLStore({ db: this._SEQUELIZE });
  }

  get sequelize() {
    return this._SEQUELIZE;
  }

  get store() {
    return this._STORE;
  }

  async start(force = false) {
    await this._SEQUELIZE.sync({ force });
  }

  async stop() {
    await this._SEQUELIZE.close();
  }
}

export const ModelFactory = <
  Attr = { [key: string]: any },
  CreateAttr = { [key: string]: any }
>(
  attributes: ModelAttributes<SQLModel<Attr, CreateAttr>>,
  options: InitOptions<SQLModel<Attr, CreateAttr>>
) => {
  return options.sequelize.define(`${options.tableName}`, attributes, options);
};
