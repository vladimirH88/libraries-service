import { Test, TestingModule } from '@nestjs/testing';
import { createRequest } from 'node-mocks-http';
import { AuthService } from '@services/auth.service';
import { ICredentials } from 'src/types/credentials';
import { AuthController } from '@controllers/auth.controller';
import { EMPLOYEE } from '@utils/testUtils/constants';

describe('AuthController', () => {
  const ID = '1';
  const responses = {
    login: 'loginResponse',
    logout: 'logoutResponse',
    registration: 'registrationResponse',
    createNewEmployee: 'createNewEmployeeResponse',
    refreshTokens: 'refreshTokensResponse',
  };

  let authService: AuthService;
  let authController: AuthController;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        login: jest.fn(() => responses.login),
        logout: jest.fn(() => responses.logout),
        registration: jest.fn(async () => responses.registration),
        createNewEmployee: jest.fn(() => responses.createNewEmployee),
        refreshTokens: jest.fn(() => responses.refreshTokens),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, ApiServiceProvider],
    }).compile();
    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });
  describe('login', () => {
    it('Should call authService.login and return the correct response', () => {
      expect(authController.login(EMPLOYEE)).toBe(responses.login);
      expect(authService.login).toHaveBeenCalledWith(EMPLOYEE);
    });
  });
  describe('logout', () => {
    it('Should call authService.logout properly', () => {
      const request = createRequest();
      request.user = { id: ID };
      authController.logout(request);
      expect(authService.logout).toHaveBeenCalledWith(ID);
    });
  });
  describe('registration', () => {
    it('Should call authService.registration and return the correct response', async () => {
      const credentials: ICredentials = {
        id: 1,
        login: 'login',
        password: 'password',
      };
      expect(await authController.registration(credentials)).toBe(
        responses.registration,
      );
      expect(authService.registration).toHaveBeenCalledWith(credentials);
    });
  });
  describe('createNewEmployee', () => {
    it('Should call authService.createNewEmployee and return the correct response', () => {
      expect(authController.createNewEmployee(EMPLOYEE)).toBe(
        responses.createNewEmployee,
      );
      expect(authService.createNewEmployee).toHaveBeenCalledWith(EMPLOYEE);
    });
  });
  describe('confirm', () => {
    it('Should return correct value', () => {
      expect(authController.confirm({ id: ID })).toStrictEqual({ id: ID });
    });
  });
  describe('refreshTokens', () => {
    it('Should call authService.refreshTokens with correct args and return the correct response', () => {
      const request = createRequest();
      const user = { id: ID, refreshToken: 'refreshToken' };
      request.user = user;
      expect(authController.refreshTokens(request)).toBe(
        responses.refreshTokens,
      );
      expect(authService.refreshTokens).toHaveBeenCalledWith(
        user.id,
        user.refreshToken,
      );
    });
  });
});
