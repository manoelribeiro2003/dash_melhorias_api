import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchModule } from 'src/branch/branch.module';
import { ProjetoModule } from 'src/projeto/projeto.module';
import { TarefaModule } from 'src/tarefa/tarefa.module';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   database: 'postgres',
    //   password: '12345678',
    //   autoLoadEntities: true,
    //   synchronize: true //Sincroniza com o BD. Não deve ser usado em produção
    // }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'melhorias.sqlite',
      autoLoadEntities: true,
      synchronize: true, //Sincroniza com o BD. Não deve ser usado em produção
    }),
    BranchModule,
    ProjetoModule,
    TarefaModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
