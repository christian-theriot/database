import { SQL } from "..";
import env from "@theriot.dev/env";

describe("getDatabase fn", () => {
  let db: SQL.Database;
  const user = env.get("POSTGRES_USER");
  const pwd = env.get("POSTGRES_PASSWORD");
  const host = env.get("POSTGRES_HOST");
  const port = env.get("POSTGRES_PORT");
  const dbName = env.get("POSTGRES_DB");

  beforeAll(() => {
    db = new SQL.Database(
      `postgres://${user}:${pwd}@${host}:${port}/${dbName}`
    );
  });

  it("can create a db", () => {
    expect(db).toBeDefined();
  });

  it("can call start", async () => {
    jest
      .spyOn(SQL.Sequelize.prototype, "sync")
      .mockImplementationOnce(() => Promise.resolve({} as SQL.Sequelize));

    await db.start();

    expect(SQL.Sequelize.prototype.sync).toHaveBeenCalledWith({ force: false });
  });

  it("has a sequelize getter", () => {
    expect(db.sequelize).toBeDefined();
  });

  it("has a store getter", () => {
    expect(db.store).toBeDefined();
  });

  it("can call stop", async () => {
    jest
      .spyOn(SQL.Sequelize.prototype, "close")
      .mockImplementationOnce(() => Promise.resolve());

    await db.stop();

    expect(SQL.Sequelize.prototype.close).toHaveBeenCalled();
  });
});
