import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateProjetoDto } from './create-projeto.dto';
import { UpdateTarefaDto } from 'src/tarefa/dto/update-tarefa.dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProjetoDto extends PartialType(OmitType(CreateProjetoDto, ['tarefas'] as const)) {

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateTarefaDto)
    readonly tarefas!: UpdateTarefaDto[];

}
