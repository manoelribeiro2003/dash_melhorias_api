import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHistoricoTarefaDto {
  @IsInt()
  @IsNotEmpty()
  readonly tarefaId!: number;

  @IsInt()
  @IsNotEmpty()
  readonly projetoId!: number;

  @IsString()
  @IsNotEmpty()
  readonly nome!: string;

  @IsInt()
  @IsNotEmpty()
  readonly ordem!: number;

  @IsOptional()
  @IsString()
  readonly status?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly dataInicio?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly dataTermino?: Date;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  readonly excluido?: boolean;

  @IsInt()
  @IsNotEmpty()
  readonly criadoPorId!: number;

  @IsInt()
  @IsNotEmpty()
  readonly atualizadoPorId!: number;
}
