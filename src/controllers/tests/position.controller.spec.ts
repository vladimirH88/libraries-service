import { Test, TestingModule } from '@nestjs/testing';
import { PositionService } from '@services/position.service';
import { POSITION } from '@utils/testUtils/constants';
import { PositionController } from '@controllers/position.controller';

describe('PositionController', () => {
  let controller: PositionController;
  let service: PositionService;

  const ID = '1';

  const responses = {
    create: 'createResponse',
    findOne: 'findOneResponse',
    update: 'updateResponse',
    remove: 'removeResponse',
  };

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: PositionService,
      useFactory: () => ({
        create: jest.fn(() => responses.create),
        findAll: jest.fn(),
        findOne: jest.fn(() => responses.findOne),
        update: jest.fn(() => responses.update),
        remove: jest.fn(() => responses.remove),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PositionController],
      providers: [PositionService, ApiServiceProvider],
    }).compile();

    controller = app.get<PositionController>(PositionController);
    service = app.get<PositionService>(PositionService);
  });
  describe('create', () => {
    it('Should call service.create properly and return the correct response', () => {
      expect(controller.create(POSITION)).toBe(responses.create);
      expect(service.create).toHaveBeenCalledWith(POSITION);
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
      expect(controller.update(ID, POSITION)).toBe(responses.update);
      expect(service.update).toHaveBeenCalledWith(+ID, POSITION);
    });
  });
  describe('remove', () => {
    it('Should call service.remove properly and return the correct response', () => {
      expect(controller.remove(ID)).toBe(responses.remove);
      expect(service.remove).toHaveBeenCalledWith(+ID);
    });
  });
});
