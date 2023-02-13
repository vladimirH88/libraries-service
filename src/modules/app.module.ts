import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryModule } from './library.module';
import { typeOrmAsyncConfig } from '../config/typeorm.config';
import { PositionModule } from './position.module';
import { GenreModule } from './genre.module';
import { AuthorModule } from './author.module';
import { EmployeeModule } from './employee.module';
import { BookModule } from './book.module';
import { UserModule } from './user.module';
import { ReservedBooksModule } from './reserved-books.module';
import { AuthModule } from './auth.module';
import { RolesModule } from './roles.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../guards/roles.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailConfig } from '../config/mail.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    LibraryModule,
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    PositionModule,
    GenreModule,
    AuthorModule,
    EmployeeModule,
    BookModule,
    UserModule,
    ReservedBooksModule,
    AuthModule,
    RolesModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailConfig,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
