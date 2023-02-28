import { Test, TestingModule } from '@nestjs/testing';

import { AuthorController } from '@controllers/author.controller';
import { AuthorService } from '@services/author.service';
import { AUTHOR } from '@utils/testUtils/constants';

describe('AuthorController', () => {
  let controller: AuthorController;
  let service: AuthorService;

  const ID = '1';

  const responses = {
    create: 'createResponse',
    findOne: 'findOneResponse',
    update: 'updateResponse',
    remove: 'removeResponse',
  };

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: AuthorService,
      useFactory: () => ({
        create: jest.fn(() => responses.create),
        findAll: jest.fn(),
        findOne: jest.fn(() => responses.findOne),
        update: jest.fn(() => responses.update),
        remove: jest.fn(() => responses.remove),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [AuthorService, ApiServiceProvider],
    }).compile();

    controller = app.get<AuthorController>(AuthorController);
    service = app.get<AuthorService>(AuthorService);
  });
  describe('create', () => {
    it('Should call service.create properly and return the correct response', () => {
      expect(controller.create(AUTHOR)).toBe(responses.create);
      expect(service.create).toHaveBeenCalledWith(AUTHOR);
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
      expect(controller.update(ID, AUTHOR)).toBe(responses.update);
      expect(service.update).toHaveBeenCalledWith(+ID, AUTHOR);
    });
  });
  describe('remove', () => {
    it('Should call service.remove properly and return the correct response', () => {
      expect(controller.remove(ID)).toBe(responses.remove);
      expect(service.remove).toHaveBeenCalledWith(+ID);
    });
  });
});
