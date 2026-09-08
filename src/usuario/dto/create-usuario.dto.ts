import { IsEmail, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  readonly nome!: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;

  @IsOptional()
  @IsPositive()
  readonly gestorId!: number;
}
