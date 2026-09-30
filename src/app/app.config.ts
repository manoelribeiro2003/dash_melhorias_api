import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

type AppDatabaseType = 'postgres' | 'better-sqlite3';

export default registerAs('app', () => {
  //pega os tipos disponiveis de bancos suportados pelo TypeORM
  const databaseType = process.env.DATABASE_TYPE as AppDatabaseType;

  //fornece uma configuração ao TypeORM de acordo com o banco escolhino no .env
  const database: TypeOrmModuleOptions =
    databaseType === 'better-sqlite3'
      ? {
          type: 'better-sqlite3',
          database: process.env.DATABASE_DATABASE,
          autoLoadEntities: process.env.DATABASE_AUTOLOADENTITIES !== 'false',
          synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
        }
      : {
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: process.env.DATABASE_PORT
            ? Number(process.env.DATABASE_PORT)
            : undefined,
          username: process.env.DATABASE_USERNAME,
          database: process.env.DATABASE_DATABASE,
          password: process.env.DATABASE_PASSWORD,
          autoLoadEntities: process.env.DATABASE_AUTOLOADENTITIES !== 'false',
          synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
        };

  return {
    database,
    environment: process.env.NODE_ENV || 'development',
  };
});
