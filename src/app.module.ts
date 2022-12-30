import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibraryModule } from './library/library.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { PositionModule } from './position/position.module';
import { GenreModule } from './genre/genre.module';
import { AuthorModule } from './author/author.module';
import { EmployeeModule } from './employee/employee.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { ReservedBooksModule } from './reserved-books/reserved-books.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
