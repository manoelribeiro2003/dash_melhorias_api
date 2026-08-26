import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateTarefaDto } from "src/tarefa/dto/create-tarefa.dto";
import { Usuario } from "src/usuario/entities/usuario.entity";

export class CreateProjetoDto {
    @IsString()
    @IsNotEmpty()
    readonly nome!: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly categoria?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly status?: string

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    readonly dataInicio?: Date

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    readonly dataTermino?: Date

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    readonly orcamento?: string

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    readonly prioridade?: boolean
    
    @IsInt()
    @IsNotEmpty()
    readonly criadoPorId!: number

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateTarefaDto)
    readonly tarefas?: CreateTarefaDto[];
}