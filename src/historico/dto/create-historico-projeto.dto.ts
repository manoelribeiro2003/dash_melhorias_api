import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
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
  @Matches(/^\d+(?:\.\d{1,2})?$/, {
    message:
      'orcamento deve ser um número válido usando ponto como separador decimal',
  })
  readonly orcamento?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+(?:\.\d{1,4})?$/, {
    message:
      'ganhoPar deve ser um número válido com até 4 casas decimais usando ponto como separador',
  })
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
