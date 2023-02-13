import { ConfigService } from '@nestjs/config';

export const getMailConfig = async (
  configService: ConfigService,
): Promise<any> => {
  return {
    transport: {
      host: configService.get<string>('MAIL_HOST'),
      port: configService.get<string>('MAIL_PORT'),
      auth: {
        user: configService.get<string>('MAIL_AUTH_USER'),
        pass: configService.get<string>('MAIL_AUTH_PASS'),
      },
    },
    defaults: {
      from: `"No Reply" <${configService.get<string>('MAIL_HOST')}>`,
    },
  };
};
