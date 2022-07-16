import { Database, ModelFactory } from '.';
import env from '@theriot.dev/env';
import { DataTypes } from 'sequelize';

describe('SQL Model Factory', () => {
  let db: Database;
  let Model: any;

  beforeAll(() => {
    const user = env.get('POSTGRES_USER');
    const pwd = env.get('POSTGRES_PASSWORD');
    const host = env.get('POSTGRES_HOST');
    const port = env.get('POSTGRES_PORT');
    const dbName = env.get('POSTGRES_DB');

    db = new Database(`postgres://${user}:${pwd}@${host}:${port}/${dbName}`);
  });

  afterAll(async () => {
    await db.stop();
  });

  it('can create a model using the factory', async () => {
    Model = ModelFactory(
      {
        id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          autoIncrement: true
        },
        uuid: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4
        },
        name: new DataTypes.STRING(32)
      },
      {
        sequelize: db.sequelize,
        tableName: 'test model',
        timestamps: false
      }
    );

    await Model.sync({ force: true });

    const instance = await Model.create({ name: 'test' });
    const saved = await Model.findByPk(instance.id);

    expect(saved.uuid).toMatch(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/);
    expect(saved.name).toBe('test');
  });
});
