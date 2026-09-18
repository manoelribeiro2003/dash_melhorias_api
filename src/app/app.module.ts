import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchModule } from 'src/branch/branch.module';
import { ProjetoModule } from 'src/projeto/projeto.module';
import { TarefaModule } from 'src/tarefa/tarefa.module';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { HistoricoModule } from 'src/historico/historico.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'dash_melhorias',
      password: '12345678',
      autoLoadEntities: true,
      synchronize: false,
    }),
    BranchModule,
    ProjetoModule,
    TarefaModule,
    UsuarioModule,
    HistoricoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
