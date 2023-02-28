import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Employee } from '@entities/employee.entity';
import { EmployeeService } from '@services/employee.service';
import { EMPLOYEE, ID } from '@utils/testUtils/constants';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let mockedRepo: { [x: string]: () => void };

  const responses = {
    save: 'save',
    findAll: ['findResponse'],
    findOne: 'findOneResponse',
    update: 'updateResponse',
    delete: 'removeResponse',
  };

  beforeEach(async () => {
    mockedRepo = {
      save: jest.fn(() => Promise.resolve(responses.save)),
      find: jest.fn(() => Promise.resolve(responses.findAll)),
      findOne: jest.fn(() => Promise.resolve(responses.findOne)),
      update: jest.fn(() => Promise.resolve(responses.update)),
      delete: jest.fn(() => Promise.resolve(responses.delete)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockedRepo,
        },
      ],
    }).compile();
    service = await module.get(EmployeeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should save and return the employee', async () => {
      const createSpy = jest.spyOn(mockedRepo, 'save');
      expect(await service.create(EMPLOYEE)).toStrictEqual(responses.save);

      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(EMPLOYEE);
    });
    it('should throw an exception', async () => {
      jest.spyOn(mockedRepo, 'save').mockImplementation(() => Promise.reject());
      await expect(service.create(EMPLOYEE)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
  describe('findAll', () => {
    it('should return the array of employees', async () => {
      const findSpy = jest.spyOn(mockedRepo, 'find');
      expect(await service.findAll()).toStrictEqual(responses.findAll);
      expect(findSpy).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception', async () => {
      jest.spyOn(mockedRepo, 'find').mockImplementation(() => Promise.reject());
      await expect(service.findAll()).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
  describe('findById', () => {
    it('should return the employee', async () => {
      const findSpy = jest.spyOn(mockedRepo, 'findOne');
      expect(await service.findById(ID)).toStrictEqual(responses.findOne);
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        where: { id: ID },
        relations: ['role'],
      });
    });
    it('should throw an exception', async () => {
      jest
        .spyOn(mockedRepo, 'findOne')
        .mockImplementation(() => Promise.reject());
      await expect(service.findById(ID)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
  describe('findByLogin', () => {
    const login = 'testLogin';
    it('should return the employee', async () => {
      const findSpy = jest.spyOn(mockedRepo, 'findOne');
      expect(await service.findByLogin(login)).toStrictEqual(responses.findOne);
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        where: { login },
        relations: ['role'],
      });
    });
    it('should throw an exception', async () => {
      jest
        .spyOn(mockedRepo, 'findOne')
        .mockImplementation(() => Promise.reject());
      await expect(service.findByLogin(login)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
  describe('findByEmail', () => {
    const email = 'test@mail.com';
    it('should return the employee', async () => {
      const findSpy = jest.spyOn(mockedRepo, 'findOne');
      expect(await service.findByEmail(email)).toStrictEqual(responses.findOne);
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        where: { email },
      });
    });
    it('should throw an exception', async () => {
      jest
        .spyOn(mockedRepo, 'findOne')
        .mockImplementation(() => Promise.reject());
      await expect(service.findByEmail(email)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
  describe('update', () => {
    it('should update the employee', async () => {
      const spy = jest.spyOn(mockedRepo, 'update');
      expect(await service.update(ID, EMPLOYEE)).toStrictEqual(
        responses.update,
      );
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ id: ID }, EMPLOYEE);
    });
    it('should throw an exception', async () => {
      jest
        .spyOn(mockedRepo, 'update')
        .mockImplementation(() => Promise.reject());
      await expect(service.update(ID, EMPLOYEE)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
  describe('remove', () => {
    it('should remove the employee', async () => {
      const spy = jest.spyOn(mockedRepo, 'delete');
      expect(await service.remove(ID)).toStrictEqual(responses.delete);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ id: ID });
    });
    it('should throw an exception', async () => {
      jest
        .spyOn(mockedRepo, 'delete')
        .mockImplementation(() => Promise.reject());
      await expect(service.remove(ID)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
});
