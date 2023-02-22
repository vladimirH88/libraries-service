import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from 'src/services/employee.service';
import { EMPLOYEE } from 'src/utils/testUtils/constants';
import { EmployeeController } from '../employee.controller';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  const ID = '1';

  const responses = {
    create: 'createResponse',
    findById: 'findByIdResponse',
    update: 'updateResponse',
    remove: 'removeResponse',
  };

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: EmployeeService,
      useFactory: () => ({
        create: jest.fn(() => responses.create),
        findAll: jest.fn(),
        findById: jest.fn(() => responses.findById),
        update: jest.fn(() => responses.update),
        remove: jest.fn(() => responses.remove),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService, ApiServiceProvider],
    }).compile();

    controller = app.get<EmployeeController>(EmployeeController);
    service = app.get<EmployeeService>(EmployeeService);
  });
  describe('create', () => {
    it('Should call service.create properly and return the correct response', () => {
      expect(controller.create(EMPLOYEE)).toBe(responses.create);
      expect(service.create).toHaveBeenCalledWith(EMPLOYEE);
    });
  });
  describe('findAll', () => {
    it('Should call service.findAll and return the correct response', () => {
      controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('Should call service.findById with id as number and return the correct response', () => {
      expect(controller.findOne(ID)).toBe(responses.findById);
      expect(service.findById).toHaveBeenCalledWith(+ID);
    });
  });
  describe('update', () => {
    it('Should call service.update properly and return the correct response', () => {
      expect(controller.update(ID, EMPLOYEE)).toBe(responses.update);
      expect(service.update).toHaveBeenCalledWith(+ID, EMPLOYEE);
    });
  });
  describe('remove', () => {
    it('Should call service.remove properly and return the correct response', () => {
      expect(controller.remove(ID)).toBe(responses.remove);
      expect(service.remove).toHaveBeenCalledWith(+ID);
    });
  });
});
