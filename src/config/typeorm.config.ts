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
    host: configService.get<string>('POSTGRES_HOST'),
    port: parseInt(configService.get<string>('POSTGRES_PORT')),
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DATABASE'),
    entities: ['dist/**/*entity.js'],
    migrations: ['dist/migrations/*.js'],
    migrationsTableName: 'migrations',
    synchronize: false,
    logging: true,
    migrationsRun: false,
  }),
};
