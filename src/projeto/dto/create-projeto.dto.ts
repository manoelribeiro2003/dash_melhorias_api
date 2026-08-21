import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateProjetoDto {
    @IsString()
    @IsNotEmpty()
    readonly nome!: string

    @IsInt()
    @IsNotEmpty()
    readonly criadoPorId!: number
}
