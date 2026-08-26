import { IsBoolean, IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

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
    
}