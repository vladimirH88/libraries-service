import { Author } from 'src/entityes/author.entity';
import { Book } from 'src/entityes/book.entity';
import { Employee } from 'src/entityes/employee.entity';
import { Genre } from 'src/entityes/genre.entity';
import { Library } from 'src/entityes/library.entity';
import { Position } from 'src/entityes/position.entity';
import { Role } from 'src/entityes/role.entity';
import { User } from 'src/entityes/user.entity';
import {
  generateAuthors,
  generateBooks,
  generateEmployees,
  generateGenres,
  generateLibraries,
  generatePositions,
  generateUsers,
  NUMBER_OF_AUTHOR,
  NUMBER_OF_GENRES,
  NUMBER_OF_LIBRARIES,
  NUMBER_OF_POSITIONS,
  roles,
} from 'src/helpers/mocks/entity.mock';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class seed1676469101424 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const libraries = generateLibraries(NUMBER_OF_LIBRARIES);
    for (const item of libraries) {
      await queryRunner.manager.save(Library, item);
    }
    const genres = generateGenres(NUMBER_OF_GENRES);
    for (const item of genres) {
      await queryRunner.manager.save(Genre, item);
    }
    const positions = generatePositions(NUMBER_OF_POSITIONS);
    for (const item of positions) {
      await queryRunner.manager.save(Position, item);
    }
    for (const item of roles) {
      await queryRunner.manager.save(Role, item);
    }
    const authors = generateAuthors(NUMBER_OF_AUTHOR);
    for (const item of authors) {
      await queryRunner.manager.save(Author, item);
    }
    const books = generateBooks(1000);
    for (const item of books) {
      await queryRunner.manager.save(Book, item);
    }
    const employees = generateEmployees(100);
    for (const item of employees) {
      await queryRunner.manager.save(Employee, item);
    }
    const users = generateUsers(100);
    for (const item of users) {
      await queryRunner.manager.save(User, item);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.manager.clear(Library);
  }
}
