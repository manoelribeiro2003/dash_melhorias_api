import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTarefaDto {
    @IsString()
    @IsNotEmpty()
    readonly nome!: string;

    @IsInt()
    @IsNotEmpty()
    readonly ordem!: number;

    @IsOptional()
    @IsBoolean()
    readonly concluido?: boolean;

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

}