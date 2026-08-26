import { PartialType } from '@nestjs/mapped-types';
import { CreateTarefaDto } from './create-tarefa.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateTarefaDto extends PartialType(CreateTarefaDto) {

    @IsOptional()
    @IsInt()
    readonly id?: number;
}