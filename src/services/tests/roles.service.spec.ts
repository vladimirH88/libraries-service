import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Role } from '@entities/role.entity';
import { RolesService } from '@services/roles.service';
import { ID, ROLE } from '@utils/testUtils/constants';

describe('RolesService', () => {
  let service: RolesService;

  const responses = {
    save: 'save',
    findAll: ['findResponse'],
    findOne: 'findOneResponse',
    update: 'updateResponse',
  };

  const mockedRepo = {
    save: jest.fn(() => Promise.resolve(responses.save)),
    find: jest.fn(() => Promise.resolve(responses.findAll)),
    findOneBy: jest.fn(() => Promise.resolve(responses.findOne)),
    update: jest.fn(() => Promise.resolve(responses.update)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role),
          useValue: mockedRepo,
        },
      ],
    }).compile();
    service = await module.get(RolesService);
  });

  describe('create', () => {
    it('should save and return the role', async () => {
      const createSpy = jest.spyOn(mockedRepo, 'save');
      expect(await service.create(ROLE)).toEqual(responses.save);

      expect(createSpy).toHaveBeenCalledTimes(1);
      expect(createSpy).toHaveBeenCalledWith(ROLE);
    });
    it('should throw an exception', async () => {
      jest.spyOn(mockedRepo, 'save').mockImplementation(() => Promise.reject());
      await expect(service.create(ROLE)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
  describe('findAll', () => {
    it('should return the array of roles', async () => {
      const findSpy = jest.spyOn(mockedRepo, 'find');
      expect(await service.findAll()).toEqual(responses.findAll);
      expect(findSpy).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception', async () => {
      jest.spyOn(mockedRepo, 'find').mockImplementation(() => Promise.reject());
      await expect(service.create(ROLE)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
  describe('findOne', () => {
    it('should return the role', async () => {
      const findSpy = jest.spyOn(mockedRepo, 'findOneBy');
      expect(await service.findOne(ID)).toEqual(responses.findOne);
      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({ id: ID });
    });
    it('should throw an exception', async () => {
      jest
        .spyOn(mockedRepo, 'findOneBy')
        .mockImplementation(() => Promise.reject());
      await expect(service.create(ROLE)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
  describe('update', () => {
    it('should update the role', async () => {
      const spy = jest.spyOn(mockedRepo, 'update');
      expect(await service.update(ID, ROLE)).toEqual(responses.update);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ id: ID }, ROLE);
    });
    it('should throw an exception', async () => {
      jest
        .spyOn(mockedRepo, 'update')
        .mockImplementation(() => Promise.reject());
      await expect(service.create(ROLE)).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
});
