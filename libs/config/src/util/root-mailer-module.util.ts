import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { DynamicModule } from '@nestjs/common';
import { EnvironmentModule, MailerEnvironmentService } from '../module/environment';

const rootMailerModule = (templatePath: string): DynamicModule => {
  return MailerModule.forRootAsync({
    imports: [EnvironmentModule],
    inject: [MailerEnvironmentService],
    useFactory: (mailerEnvironmentService: MailerEnvironmentService) => ({
      transport: {
        host: mailerEnvironmentService.host,
        port: mailerEnvironmentService.port,
        secure: false,
        auth: {
          user: mailerEnvironmentService.username,
          pass: mailerEnvironmentService.password,
        },
      },
      defaults: {
        from: `"No Reply" <${mailerEnvironmentService.noReplyMailAddress}>`,
      },
      template: {
        dir: templatePath,
        adapter: new HandlebarsAdapter(undefined, { inlineCssEnabled: true }),
        options: {
          strict: true,
        },
      },
    }),
  });
};

export { rootMailerModule };
