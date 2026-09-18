import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHistoricoProjetoDto {
  @IsInt()
  @IsNotEmpty()
  readonly projetoId!: number;

  @IsString()
  @IsNotEmpty()
  readonly nome!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly categoria?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly status?: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  readonly excluido?: boolean;

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
  @IsString()
  @IsNotEmpty()
  readonly orcamento?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly ganhoPar?: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  readonly prioridade?: boolean;

  @IsInt()
  @IsNotEmpty()
  readonly criadoPorId!: number;

  @IsInt()
  @IsNotEmpty()
  readonly atualizadoPorId!: number;

  @IsInt()
  @IsNotEmpty()
  readonly gestorId!: number;
}
