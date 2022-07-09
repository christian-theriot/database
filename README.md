# @theriot.dev/database

This project provides a wrapper for connecting to databases. Currently only SQL databases are supported via [`sequelize`](https://www.npmjs.com/package/sequelize)

# Installation

```
npm install @theriot.dev/database
```

# Import

```
import { SQL } from '@theriot.dev/database'
```

# Overview

`Database`'s constructor expects a connection string, such as

```
postgres://{user}:{password}@{host}:{port}/{dbName}
```

or any other valid postgres conenction string.
Then, through the database instance, you are able to `start` the connection, `stop` the connection, and access the `sequelize` getter which returns a reference to the Sequelize object. In addition, an implementation of [`express-session`](https://www.npmjs.com/package/express-session) is provided via the `store` getter

```
const connectionURL = 'postgres://user:password@postgres:5432/test';
const db = new SQL.Database(connectionURL);

await db.start();

// or to initialize your models:
await db.start(true);

// inside of your Model.init:
{ sequelize: db.sequelize }

// inside of your session middleware:
{ store: db.store }

await db.stop();
```
