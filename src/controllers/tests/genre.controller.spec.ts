import { Test, TestingModule } from '@nestjs/testing';
import { GenreService } from '@services/genre.service';
import { GENRE } from '@utils/testUtils/constants';
import { GenreController } from '@controllers/genre.controller';

describe('GenreController', () => {
  let controller: GenreController;
  let service: GenreService;

  const ID = '1';

  const responses = {
    create: 'createResponse',
    findOne: 'findOneResponse',
    update: 'updateResponse',
    remove: 'removeResponse',
  };

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: GenreService,
      useFactory: () => ({
        create: jest.fn(() => responses.create),
        findAll: jest.fn(),
        findOne: jest.fn(() => responses.findOne),
        update: jest.fn(() => responses.update),
        remove: jest.fn(() => responses.remove),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GenreController],
      providers: [GenreService, ApiServiceProvider],
    }).compile();

    controller = app.get<GenreController>(GenreController);
    service = app.get<GenreService>(GenreService);
  });
  describe('create', () => {
    it('Should call service.create properly and return the correct response', () => {
      expect(controller.create(GENRE)).toBe(responses.create);
      expect(service.create).toHaveBeenCalledWith(GENRE);
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
      expect(controller.update(ID, GENRE)).toBe(responses.update);
      expect(service.update).toHaveBeenCalledWith(+ID, GENRE);
    });
  });
  describe('remove', () => {
    it('Should call service.remove properly and return the correct response', () => {
      expect(controller.remove(ID)).toBe(responses.remove);
      expect(service.remove).toHaveBeenCalledWith(+ID);
    });
  });
});
