import { faker } from '@faker-js/faker/locale/ru';

export const NUMBER_OF_LIBRARIES = 100;
export const NUMBER_OF_GENRES = 20;
export const NUMBER_OF_POSITIONS = 20;
export const NUMBER_OF_AUTHOR = 20;

/**
 * Getting a quantity with the required number of objects and functions with which returns the entity
 *
 * @param quantity Required number of objects.
 * @param itemFn Function that returns an entity.
 */
const getArrayOfItems = (quantity: number, itemFn: () => void) => {
  const arrayOfItems = [];
  for (let i = 0; i < quantity; i++) {
    arrayOfItems.push(itemFn());
  }
  return arrayOfItems;
};

export const generateLibraries = (quantity: number) => {
  const generate = () => ({
    name: faker.company.name(),
    address: `${faker.address.city()}, ${faker.address.buildingNumber()}`,
    phone: faker.phone.number(),
    email: faker.internet.email(),
  });
  return getArrayOfItems(quantity, generate);
};

export const generateGenres = (quantity: number) => {
  const generate = () => ({
    name: faker.random.word(),
    description: faker.commerce.productName(),
  });
  return getArrayOfItems(quantity, generate);
};
export const generatePositions = (quantity: number) => {
  const generate = () => ({
    name: faker.name.jobTitle(),
    description: faker.name.jobDescriptor(),
  });
  return getArrayOfItems(quantity, generate);
};

export const roles = [
  {
    name: 'guest',
    description: 'Просмотр',
    active: true,
  },
  {
    name: 'super_admin',
    description:
      'Добавление и изменение информации о сотрудниках и библиотеках',
    active: true,
  },
  {
    name: 'admin',
    description: 'Добавление, учёт книг',
    active: true,
  },
];

export const generateAuthors = (quantity: number) => {
  const generate = () => ({
    name: faker.name.firstName(),
    patronymic: faker.name.middleName(),
    surname: faker.name.lastName(),
  });
  return getArrayOfItems(quantity, generate);
};
export const generateBooks = (quantity: number) => {
  const generate = () => ({
    name: faker.random.word(),
    description: faker.commerce.productName(),
    isbn: faker.random.numeric(14),
    library: +faker.commerce.price(1, NUMBER_OF_LIBRARIES, 0),
    genre: +faker.commerce.price(1, NUMBER_OF_GENRES, 0),
    author: +faker.commerce.price(1, NUMBER_OF_AUTHOR, 0),
  });
  return getArrayOfItems(quantity, generate);
};
export const generateEmployees = (quantity: number) => {
  const generate = () => ({
    name: faker.name.firstName(),
    patronymic: faker.name.middleName(),
    surname: faker.name.lastName(),
    email: faker.internet.email(),
    position: +faker.commerce.price(1, NUMBER_OF_AUTHOR, 0),
    library: +faker.commerce.price(1, NUMBER_OF_LIBRARIES, 0),
    employment_date: faker.date.soon(),
    fired_date: null,
    role: roles[+faker.commerce.price(1, roles.length, 0)],
    password: null,
    login: null,
    active: false,
    refresh_token: null,
  });
  return getArrayOfItems(quantity, generate);
};
export const generateUsers = (quantity: number) => {
  const generate = () => ({
    name: faker.name.firstName(),
    patronymic: faker.name.middleName(),
    surname: faker.name.lastName(),
    registration_date: faker.date.soon(),
    block: false,
    block_date: null,
    block_reason: null,
    library: +faker.commerce.price(1, NUMBER_OF_LIBRARIES, 0),
  });
  return getArrayOfItems(quantity, generate);
};
