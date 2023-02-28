import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from '@entities/user.entity';
import { UserService } from '@services/user.service';
import { ID, USER } from '@utils/testUtils/constants';

describe('UserService', () => {
  let service: UserService;

  const responses = {
    save: 'save',
    findAll: ['findResponse'],
    findOne: 'findOneResponse',
    update: 'updateResponse',
    delete: 'deleteResponse',
  };

  const mockedRepo = {
    save: jest.fn(() => Promise.resolve(responses.save)),
    find: jest.fn(() => Promise.resolve(responses.findAll)),
    findOneBy: jest.fn(() => Promise.resolve(responses.findOne)),
    update: jest.fn(() => Promise.resolve(responses.update)),
    delete: jest.fn(() => Promise.resolve(responses.delete)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockedRepo,
        },
      ],
    }).compile();
    service = await module.get(UserService);
  });

  describe('create', () => {
    it('should save and return the user', async () => {
      const createSpy = jest.spyOn(mockedRepo, 'save');
      expect(await service.create(USER)).toEqual(responses.save);

      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(USER);
    });
    it('should throw an exception', async () => {
      jest.spyOn(mockedRepo, 'save').mockImplementation(() => Promise.reject());
      await expect(service.create(USER)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
  describe('findAll', () => {
    it('should return the array of users', async () => {
      const findSpy = jest.spyOn(mockedRepo, 'find');
      expect(await service.findAll()).toEqual(responses.findAll);
      expect(findSpy).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception', async () => {
      jest.spyOn(mockedRepo, 'find').mockImplementation(() => Promise.reject());
      await expect(service.create(USER)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
  describe('findOne', () => {
    it('should return the user', async () => {
      const findSpy = jest.spyOn(mockedRepo, 'findOneBy');
      expect(await service.findOne(ID)).toEqual(responses.findOne);
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({ id: ID });
    });
    it('should throw an exception', async () => {
      jest
        .spyOn(mockedRepo, 'findOneBy')
        .mockImplementation(() => Promise.reject());
      await expect(service.create(USER)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
  describe('update', () => {
    it('should update the user', async () => {
      const spy = jest.spyOn(mockedRepo, 'update');
      expect(await service.update(ID, USER)).toEqual(responses.update);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ id: ID }, USER);
    });
    it('should throw an exception', async () => {
      jest
        .spyOn(mockedRepo, 'update')
        .mockImplementation(() => Promise.reject());
      await expect(service.create(USER)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
  describe('remove', () => {
    it('should remove the user', async () => {
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
