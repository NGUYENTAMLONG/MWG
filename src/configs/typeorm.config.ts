import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DATABASE_CONFIG } from './constants.config';

const options: DataSourceOptions & SeederOptions = {
  type: DATABASE_CONFIG.TYPE as any,
  host: DATABASE_CONFIG.HOST,
  port: DATABASE_CONFIG.PORT,
  username: DATABASE_CONFIG.USERNAME,
  password: DATABASE_CONFIG.PASSWORD,
  database: DATABASE_CONFIG.DATABASE,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../../migrations/*.{ts,js}'],
  synchronize: false,
  // seeder options
  factories: [__dirname + '/../**/*/*.factory.{ts,js}'],
  seeds: ['src/**/*/seeder/*.seeder.{ts,js}'],
};

export default new DataSource(options);
