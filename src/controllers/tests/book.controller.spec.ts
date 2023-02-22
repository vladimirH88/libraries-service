import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from 'src/services/book.service';
import { BOOK } from 'src/utils/testUtils/constants';
import { BookController } from '../book.controller';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  const ID = '1';

  const responses = {
    create: 'createResponse',
    findOne: 'findOneResponse',
    update: 'updateResponse',
    remove: 'removeResponse',
  };

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: BookService,
      useFactory: () => ({
        create: jest.fn(() => responses.create),
        findAll: jest.fn(),
        findOne: jest.fn(() => responses.findOne),
        update: jest.fn(() => responses.update),
        remove: jest.fn(() => responses.remove),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService, ApiServiceProvider],
    }).compile();

    controller = app.get<BookController>(BookController);
    service = app.get<BookService>(BookService);
  });
  describe('create', () => {
    it('Should call service.create properly and return the correct response', () => {
      expect(controller.create(BOOK)).toBe(responses.create);
      expect(service.create).toHaveBeenCalledWith(BOOK);
    });
  });
  describe('findAll', () => {
    it('Should call service.findAll and return the correct response', () => {
      controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('Should call service.findOne with id as number and return the correct response', () => {
      expect(controller.findOne(ID)).toBe(responses.findOne);
      expect(service.findOne).toHaveBeenCalledWith(+ID);
    });
  });
  describe('update', () => {
    it('Should call service.update properly and return the correct response', () => {
      expect(controller.update(ID, BOOK)).toBe(responses.update);
      expect(service.update).toHaveBeenCalledWith(+ID, BOOK);
    });
  });
  describe('remove', () => {
    it('Should call service.remove properly and return the correct response', () => {
      expect(controller.remove(ID)).toBe(responses.remove);
      expect(service.remove).toHaveBeenCalledWith(+ID);
    });
  });
});
