import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@services/user.service';
import { USER } from '@utils/testUtils/constants';
import { UserController } from '@controllers/user.controller';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const ID = '1';

  const responses = {
    create: 'createResponse',
    findOne: 'findOneResponse',
    update: 'updateResponse',
    remove: 'removeResponse',
  };

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        create: jest.fn(() => responses.create),
        findAll: jest.fn(),
        findOne: jest.fn(() => responses.findOne),
        update: jest.fn(() => responses.update),
        remove: jest.fn(() => responses.remove),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, ApiServiceProvider],
    }).compile();

    controller = app.get<UserController>(UserController);
    service = app.get<UserService>(UserService);
  });
  describe('create', () => {
    it('Should call service.create properly and return the correct response', () => {
      expect(controller.create(USER)).toBe(responses.create);
      expect(service.create).toHaveBeenCalledWith(USER);
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
      expect(controller.update(ID, USER)).toBe(responses.update);
      expect(service.update).toHaveBeenCalledWith(+ID, USER);
    });
  });
  describe('remove', () => {
    it('Should call service.remove properly and return the correct response', () => {
      expect(controller.remove(ID)).toBe(responses.remove);
      expect(service.remove).toHaveBeenCalledWith(+ID);
    });
  });
});
