import { DatabaseEnvironmentService, EnvironmentModule } from '@edd/config/module/environment';
import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const registerUserDatabaseModule = (): DynamicModule => {
  return TypeOrmModule.forRootAsync({
    imports: [EnvironmentModule],
    inject: [DatabaseEnvironmentService],
    useFactory: async (databaseEnvironmentService: DatabaseEnvironmentService) => {
      return {
        type: 'postgres',
        host: databaseEnvironmentService.postgresHost,
        port: databaseEnvironmentService.postgresPort,
        username: databaseEnvironmentService.postgresUser,
        password: databaseEnvironmentService.postgresPassword,
        database: databaseEnvironmentService.postgresDatabase,
        entities: [],
        autoLoadEntities: true,
        synchronize: true,
      };
    },
  });
};

export { registerUserDatabaseModule };
