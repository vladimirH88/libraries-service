import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';

import { AuthAdminService } from '@services/auth/auth-admin.service';
import { EmployeeService } from '@services/employee.service';
import encryption from '@utils/encryption';
import * as responses from '@utils/response';
import {
  CREDENTIALS,
  EMPLOYEE,
  HASH_PASSWORD,
  ID,
  REFRESH_TOKEN,
  SEND_MAIL_RESPONSE,
  TOKENS,
} from '@utils/testUtils/constants';

describe('AutService', () => {
  let service: AuthAdminService;

  const employeeRepo = {
    findByLogin: jest.fn(() => Promise.resolve(EMPLOYEE)),
    update: jest.fn(() => Promise.resolve(EMPLOYEE)),
    findById: jest.fn(() => Promise.resolve(EMPLOYEE)),
    findByEmail: jest.fn(() => Promise.resolve(EMPLOYEE)),
    create: jest.fn(() => Promise.resolve(EMPLOYEE)),
  };
  const mailRepo = {
    sendMail: jest.fn(() => Promise.resolve(SEND_MAIL_RESPONSE)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthAdminService,
        {
          provide: EmployeeService,
          useValue: employeeRepo,
        },
        {
          provide: JwtService,
          useValue: null,
        },
        {
          provide: MailerService,
          useValue: mailRepo,
        },
        {
          provide: ConfigService,
          useValue: null,
        },
      ],
    }).compile();
    service = await module.get(AuthAdminService);
  });

  describe('login', () => {
    it('should throw the unauthorized exception', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);
      expect(await service.login(EMPLOYEE)).toStrictEqual(
        new UnauthorizedException('Неправильный логин или пароль'),
      );
    });
    it('should return tokens', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValueOnce(EMPLOYEE);
      jest.spyOn(service as any, 'generateTokens').mockReturnValueOnce(TOKENS);

      expect(await service.login(EMPLOYEE)).toStrictEqual(TOKENS);
    });
  });
  describe('logout', () => {
    it('should return updated employee', async () => {
      expect(await service.logout(ID)).toEqual(EMPLOYEE);
      expect(jest.spyOn(employeeRepo, 'update')).toHaveBeenCalledWith(ID, {
        refresh_token: null,
      });
    });
  });
  describe('confirmRegistration', () => {
    it('should replace employee status with true', async () => {
      const findByIdSpy = jest.spyOn(employeeRepo, 'findById');
      const updateSpy = jest.spyOn(employeeRepo, 'update');
      await service.confirmRegistration(ID);

      expect(findByIdSpy).toHaveBeenCalledWith(ID);
      expect(updateSpy).toHaveBeenCalledWith(ID, { ...EMPLOYEE, active: true });
    });
    it('should throw an exception', async () => {
      jest.spyOn(employeeRepo, 'update').mockRejectedValueOnce({});
      const throwHttpErrorMock = jest
        .spyOn(responses, 'throwHttpError')
        .mockReturnValue('Error' as never);
      await service.confirmRegistration(ID);
      expect(throwHttpErrorMock).toHaveBeenCalled();
    });
  });
  describe('createNewEmployee', () => {
    it('should send email to the employee with true', async () => {
      const findByEmailSpy = jest
        .spyOn(employeeRepo, 'findByEmail')
        .mockImplementation(() => null);
      const createSpy = jest.spyOn(employeeRepo, 'create');
      jest.spyOn(mailRepo, 'sendMail');
      await service.createNewEmployee(EMPLOYEE);

      expect(await service.createNewEmployee(EMPLOYEE)).toBe(
        SEND_MAIL_RESPONSE,
      );
      expect(findByEmailSpy).toHaveBeenCalledWith(EMPLOYEE.email);
      expect(createSpy).toHaveBeenCalledWith(EMPLOYEE);
    });
    it('should throw bad request exception: user exist', async () => {
      jest.spyOn(employeeRepo, 'findByEmail').mockResolvedValue(EMPLOYEE);

      expect(await service.createNewEmployee(EMPLOYEE)).toStrictEqual(
        new HttpException(
          'Пользователь с таким email уже существует',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
    it('should throw an exception', async () => {
      jest.spyOn(employeeRepo, 'create').mockRejectedValueOnce({});
      const throwHttpErrorMock = jest
        .spyOn(responses, 'throwHttpError')
        .mockReturnValue('Error' as never);
      await service.confirmRegistration(ID);
      expect(throwHttpErrorMock).toHaveBeenCalled();
    });
  });
  describe('registration', () => {
    it('should return the redirect url', async () => {
      const findByLoginSpy = jest
        .spyOn(employeeRepo, 'findByLogin')
        .mockImplementation(() => null);
      const findByIdSpy = jest.spyOn(employeeRepo, 'findById');
      const updateSpy = jest.spyOn(employeeRepo, 'update');
      const hashPassSpy = jest
        .spyOn(encryption, 'encrypt')
        .mockResolvedValue(HASH_PASSWORD);
      jest
        .spyOn(service as any, 'generateTokens')
        .mockImplementationOnce(() => TOKENS);

      expect(await service.registration(CREDENTIALS)).toStrictEqual({
        redirectUrl: `/?hash=${TOKENS.refreshToken}`,
      });
      expect(findByLoginSpy).toHaveBeenCalledWith(CREDENTIALS.login);
      expect(findByIdSpy).toHaveBeenCalledWith(CREDENTIALS.id);
      expect(hashPassSpy).toHaveBeenCalledWith(CREDENTIALS.password);
      expect(updateSpy).toHaveBeenCalledWith(ID, {
        ...EMPLOYEE,
        active: true,
        password: HASH_PASSWORD,
        login: CREDENTIALS.login,
      });
    });
    it('should throw bad request exception: user exist', async () => {
      jest.spyOn(employeeRepo, 'findByLogin').mockResolvedValue(EMPLOYEE);

      expect(await service.registration(CREDENTIALS)).toStrictEqual(
        new HttpException(
          'Пользователь с таким логином уже существует',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
    it('should throw an exception', async () => {
      jest.spyOn(employeeRepo, 'findById').mockRejectedValueOnce({});
      const throwHttpErrorMock = jest
        .spyOn(responses, 'throwHttpError')
        .mockReturnValue('Error' as never);
      await service.confirmRegistration(ID);
      expect(throwHttpErrorMock).toHaveBeenCalled();
    });
  });
  describe('refreshTokens', () => {
    it('should return new tokens', async () => {
      const employeeWithToken = { ...EMPLOYEE, refresh_token: REFRESH_TOKEN };
      const findByIdSpy = jest
        .spyOn(employeeRepo, 'findById')
        .mockResolvedValue(employeeWithToken);
      jest
        .spyOn(service as any, 'generateTokens')
        .mockImplementationOnce(() => TOKENS);
      const compareSpy = jest
        .spyOn(encryption, 'compare')
        .mockResolvedValue(true);
      const updateRefreshTokenSpy = jest.spyOn(service, 'updateRefreshToken');

      expect(await service.refreshTokens(ID, REFRESH_TOKEN)).toStrictEqual(
        TOKENS,
      );
      expect(findByIdSpy).toHaveBeenCalledWith(ID);
      expect(compareSpy).toHaveBeenCalledWith(
        REFRESH_TOKEN,
        employeeWithToken.refresh_token,
      );
      expect(updateRefreshTokenSpy).toHaveBeenCalledWith(
        employeeWithToken.id,
        TOKENS.refreshToken,
      );
    });
    it("should throw forbidden exception: user doesn't exist", async () => {
      jest.spyOn(employeeRepo, 'findById').mockResolvedValue(null);
      await expect(
        service.refreshTokens(ID, REFRESH_TOKEN),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
    it("should throw forbidden exception: passwords don't mach", async () => {
      const employeeWithToken = { ...EMPLOYEE, refresh_token: REFRESH_TOKEN };
      jest.spyOn(employeeRepo, 'findById').mockResolvedValue(employeeWithToken);
      jest.spyOn(encryption, 'compare').mockResolvedValue(false);
      await expect(
        service.refreshTokens(ID, REFRESH_TOKEN),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });
  describe('updateRefreshToken', () => {
    it('should update refresh token', async () => {
      await service.updateRefreshToken(ID, REFRESH_TOKEN);
      jest.spyOn(encryption, 'encrypt').mockResolvedValue(HASH_PASSWORD);
      const updateSpy = jest.spyOn(employeeRepo, 'update');
      expect(updateSpy).toHaveBeenCalledWith(ID, {
        refresh_token: HASH_PASSWORD,
      });
    });
  });
  describe('validateUser', () => {
    it("should return null: user doesn't exist", async () => {
      jest.spyOn(employeeRepo, 'findByLogin').mockImplementation(() => null);
      expect(await service.validateUser(EMPLOYEE)).toBeNull();
    });
    it("should return null: passwords don't mach", async () => {
      jest.spyOn(encryption, 'compare').mockResolvedValue(false);
      expect(await service.validateUser(EMPLOYEE)).toBeNull();
    });
    it('should return null: unexpected error', async () => {
      jest.spyOn(employeeRepo, 'findByLogin').mockRejectedValueOnce({});
      expect(await service.validateUser(EMPLOYEE)).toBeNull();
    });
  });
});
