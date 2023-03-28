import { CreateAuthorDto } from '@dto/author/create-author.dto';
import { CreateBookDto } from '@dto/book/create-book.dto';
import { CreateEmployeeDto } from '@dto/employee/create-employee.dto';
import { CreateGenreDto } from '@dto/genre/create-genre.dto';
import { CreateLibraryDto } from '@dto/library/create-library.dto';
import { CreatePositionDto } from '@dto/position/create-position.dto';
import { CreateReservedBookDto } from '@dto/reserved-books/create-reserved-book.dto';
import { CreateRoleDto } from '@dto/roles/create-role.dto';
import { CreateUserDto } from '@dto/user/create-user.dto';
import {
  generateAuthors,
  generateBooks,
  generateEmployees,
  generateGenres,
  generateLibraries,
  generatePositions,
  generateUsers,
  roles,
} from '@helpers/mocks/entity.mock';

const ID = '92f575b4-51d8-4c72-81e7-d88680871fe4';
const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const HASH_PASSWORD = 'hashPassword';
const SEND_MAIL_RESPONSE = 'sent';
const CREDENTIALS = { id: ID, login: 'login', password: 'password' };
const TOKENS = {
  access_token: ACCESS_TOKEN,
  refreshToken: REFRESH_TOKEN,
};

const EMPLOYEE: CreateEmployeeDto = generateEmployees(1)[0];
const AUTHOR: CreateAuthorDto = generateAuthors(1)[0];
const BOOK: CreateBookDto = generateBooks(1)[0];
const GENRE: CreateGenreDto = generateGenres(1)[0];
const LIBRARY: CreateLibraryDto = generateLibraries(1)[0];
const POSITION: CreatePositionDto = generatePositions(1)[0];
const RESERVER_BOOK: CreateReservedBookDto = {
  user_id: '00000000-0000-0000-0000-000000000000',
  book_id: '11111111-1111-1111-1111-111111111111',
  reserved_from: new Date(),
  reserved_to: new Date(),
  return_date: null,
  returned: false,
  id: '22222222-2222-2222-2222-222222222222',
  created_at: new Date(),
  updated_at: undefined,
};
const ROLE: CreateRoleDto = roles[0];
const USER: CreateUserDto = generateUsers(1)[0];

export {
  ID,
  REFRESH_TOKEN,
  HASH_PASSWORD,
  SEND_MAIL_RESPONSE,
  CREDENTIALS,
  TOKENS,
  EMPLOYEE,
  AUTHOR,
  BOOK,
  GENRE,
  LIBRARY,
  POSITION,
  RESERVER_BOOK,
  ROLE,
  USER,
};
