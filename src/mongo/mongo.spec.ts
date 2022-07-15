import { MongoDB } from "..";
import env from "@theriot.dev/env";
import MongoStore from "connect-mongo";

describe("Mongo Database", () => {
  let db: MongoDB.Database;
  const user = env.get("MONGO_USER");
  const pwd = env.get("MONGO_PASSWORD");
  const host = env.get("MONGO_HOST");
  const port = env.get("MONGO_PORT");
  const dbName = env.get("MONGO_DB");

  beforeAll(() => {
    db = new MongoDB.Database(
      `mongodb://${user}:${pwd}@${host}:${port}/${dbName}`
    );
  });

  it("can create a db", () => {
    expect(db).toBeDefined();
  });

  it("can call start", async () => {
    jest
      .spyOn(db.mongo, "connect")
      .mockImplementationOnce(() => Promise.resolve({} as typeof db.mongo));

    await db.start();

    expect(db.mongo.connect).toHaveBeenCalled();
  });

  it("has a mongo getter", () => {
    expect(db.mongo).toBeDefined();
  });

  it("has a store getter", () => {
    jest
      .spyOn(MongoStore, "create")
      .mockImplementationOnce(() => ({} as MongoStore));

    expect(db.store).toBeDefined();
  });

  it("can call stop", async () => {
    jest
      .spyOn(db.mongo, "disconnect")
      .mockImplementationOnce(() => Promise.resolve());

    await db.stop();

    expect(db.mongo.disconnect).toHaveBeenCalled();
  });
});
