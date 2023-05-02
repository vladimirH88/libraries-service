import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';

import { RolesGuard } from '@guards/roles.guard';
import { AuthAdminModule } from '@modules/auth/auth-admin.module';
import { AuthorModule } from '@modules/author.module';
import { BookModule } from '@modules/book.module';
import { EmployeeModule } from '@modules/employee.module';
import { GenreModule } from '@modules/genre.module';
import { LibraryModule } from '@modules/library.module';
import { PositionModule } from '@modules/position.module';
import { ReservedBooksModule } from '@modules/reserved-books.module';
import { RolesModule } from '@modules/roles.module';
import { UserModule } from '@modules/user.module';

import { AuthAppModule } from './auth/auth-app.module';
import { BookedBookModule } from './booked-book.module';
import { getMailConfig } from '../config/mail.config';
import { typeOrmAsyncConfig } from '../config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: `.env.${process.env.NODE_ENV}`
      envFilePath: `.env`,
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
    AuthAdminModule,
    AuthAppModule,
    RolesModule,
    BookedBookModule,
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
