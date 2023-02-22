import { Test, TestingModule } from '@nestjs/testing';
import { LibraryService } from 'src/services/library.service';
import { LIBRARY } from 'src/utils/testUtils/constants';
import { LibraryController } from '../library.controller';

describe('LibraryController', () => {
  let controller: LibraryController;
  let service: LibraryService;

  const ID = '1';

  const responses = {
    create: 'createResponse',
    findOne: LIBRARY,
    findAll: [LIBRARY],
    update: LIBRARY,
    remove: LIBRARY,
  };

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: LibraryService,
      useFactory: () => ({
        create: jest.fn(() => responses.create),
        findAll: jest.fn(),
        findOne: jest.fn(() => responses.findOne),
        update: jest.fn(() => responses.update),
        remove: jest.fn(() => responses.remove),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LibraryController],
      providers: [LibraryService, ApiServiceProvider],
    }).compile();

    controller = app.get<LibraryController>(LibraryController);
    service = app.get<LibraryService>(LibraryService);
  });
  describe('create', () => {
    it('Should call service.create properly and return the correct response', () => {
      expect(controller.create(LIBRARY)).toBe(responses.create);
      expect(service.create).toHaveBeenCalledWith(LIBRARY);
    });
  });
  describe('findAll', () => {
    it('Should call service.findAll and return the correct response', () => {
      controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('Should call service.findOne with id as number and return the correct response', async () => {
      expect(await controller.findOne(ID)).toStrictEqual(responses.findOne);
      expect(service.findOne).toHaveBeenCalledWith(+ID);
    });
  });
  describe('update', () => {
    it('Should call service.update properly and return the correct response', () => {
      expect(controller.update(ID, LIBRARY)).toBe(responses.update);
      expect(service.update).toHaveBeenCalledWith(+ID, LIBRARY);
    });
  });
  describe('remove', () => {
    it('Should call service.remove properly and return the correct response', () => {
      expect(controller.remove(ID)).toBe(responses.remove);
      expect(service.remove).toHaveBeenCalledWith(+ID);
    });
  });
});
