import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from 'src/services/roles.service';
import { ROLE } from 'src/utils/testUtils/constants';
import { RolesController } from '../roles.controller';

describe('RolesController', () => {
  let controller: RolesController;
  let service: RolesService;

  const ID = '1';

  const responses = {
    create: 'createResponse',
    findOne: 'findOneResponse',
    update: 'updateResponse',
  };

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: RolesService,
      useFactory: () => ({
        create: jest.fn(() => responses.create),
        findAll: jest.fn(),
        findOne: jest.fn(() => responses.findOne),
        update: jest.fn(() => responses.update),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [RolesService, ApiServiceProvider],
    }).compile();

    controller = app.get<RolesController>(RolesController);
    service = app.get<RolesService>(RolesService);
  });
  describe('create', () => {
    it('Should call service.create properly and return the correct response', () => {
      expect(controller.create(ROLE)).toBe(responses.create);
      expect(service.create).toHaveBeenCalledWith(ROLE);
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
      expect(controller.update(ID, ROLE)).toBe(responses.update);
      expect(service.update).toHaveBeenCalledWith(+ID, ROLE);
    });
  });
});
