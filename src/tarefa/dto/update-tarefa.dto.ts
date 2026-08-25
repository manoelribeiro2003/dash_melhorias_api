import { PartialType } from '@nestjs/mapped-types';
import { CreateTarefaDto } from './create-tarefa.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTarefaDto extends PartialType(CreateTarefaDto) {
    @IsOptional()
    @IsBoolean()
    readonly concluido?: boolean;
}
