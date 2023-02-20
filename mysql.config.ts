import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'mwg',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true,
};

export default config;
