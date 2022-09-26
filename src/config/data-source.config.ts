import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV}` });

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('PG_HOST'),
  port: parseInt(configService.get<string>('PG_PORT')),
  username: configService.get<string>('PG_USERNAME'),
  password: configService.get<string>('PG_PASSWORD'),
  database: configService.get<string>('PG_DATABASE'),
  entities: [configService.get<string>('PG_ENTITIES')],
  migrations: [configService.get<string>('PG_MIGRATIONS')],
  migrationsTableName: configService.get<string>('PG_MIGRATIONS_TABLE_NAME'),
  synchronize: false,
  logging: true,
  migrationsRun: false,
});
