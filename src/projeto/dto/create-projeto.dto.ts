import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateTarefaDto } from "src/tarefa/dto/create-tarefa.dto";

export class CreateProjetoDto {
    @IsString()
    @IsNotEmpty()
    readonly nome!: string

    @IsInt()
    @IsNotEmpty()
    readonly criadoPorId!: number

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTarefaDto)
    readonly tarefas?: CreateTarefaDto[];
}