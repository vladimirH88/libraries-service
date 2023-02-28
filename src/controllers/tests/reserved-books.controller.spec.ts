import { Test, TestingModule } from '@nestjs/testing';

import { ReservedBooksController } from '@controllers/reserved-books.controller';
import { ReservedBooksService } from '@services/reserved-books.service';
import { RESERVER_BOOK } from '@utils/testUtils/constants';

describe('ReservedBooksController', () => {
  let controller: ReservedBooksController;
  let service: ReservedBooksService;

  const ID = '1';

  const responses = {
    create: 'createResponse',
    findOne: 'findOneResponse',
    update: 'updateResponse',
    remove: 'removeResponse',
  };

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ReservedBooksService,
      useFactory: () => ({
        create: jest.fn(() => responses.create),
        findAll: jest.fn(),
        findOne: jest.fn(() => responses.findOne),
        update: jest.fn(() => responses.update),
        remove: jest.fn(() => responses.remove),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReservedBooksController],
      providers: [ReservedBooksService, ApiServiceProvider],
    }).compile();

    controller = app.get<ReservedBooksController>(ReservedBooksController);
    service = app.get<ReservedBooksService>(ReservedBooksService);
  });
  describe('create', () => {
    it('Should call service.create properly and return the correct response', () => {
      expect(controller.create(RESERVER_BOOK)).toBe(responses.create);
      expect(service.create).toHaveBeenCalledWith(RESERVER_BOOK);
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
      expect(controller.update(ID, RESERVER_BOOK)).toBe(responses.update);
      expect(service.update).toHaveBeenCalledWith(+ID, RESERVER_BOOK);
    });
  });
  describe('remove', () => {
    it('Should call service.remove properly and return the correct response', () => {
      expect(controller.remove(ID)).toBe(responses.remove);
      expect(service.remove).toHaveBeenCalledWith(+ID);
    });
  });
});
