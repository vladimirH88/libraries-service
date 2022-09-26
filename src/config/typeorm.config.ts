import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: configService.get<string>('PG_HOST'),
    port: parseInt(configService.get<string>('PG_PORT')),
    username: configService.get<string>('PG_USERNAME'),
    password: configService.get<string>('PG_PASSWORD'),
    database: configService.get<string>('PG_DATABASE'),
    schema: configService.get<string>('PG_SCHEMA'),
    entities: [configService.get<string>('PG_ENTITIES')],
    migrations: [configService.get<string>('PG_MIGRATIONS')],
    migrationsTableName: configService.get<string>('PG_MIGRATIONS_TABLE_NAME'),
    synchronize: false,
    logging: true,
    migrationsRun: false,
  }),
};
