import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BranchModule } from 'src/branch/branch.module';
import { ProjetoModule } from 'src/projeto/projeto.module';
import { TarefaModule } from 'src/tarefa/tarefa.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { HistoricoModule } from 'src/historico/historico.module';
import { appValidationSchema } from './app.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [appConfig],
      validationSchema: appValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      inject: [appConfig.KEY],
      useFactory: (config: ConfigType<typeof appConfig>) => config.database,
    }),
    BranchModule,
    ProjetoModule,
    TarefaModule,
    UsuarioModule,
    HistoricoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
