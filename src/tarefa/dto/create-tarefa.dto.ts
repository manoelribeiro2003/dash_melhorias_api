import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateTarefaDto {
    @IsString()
    @IsNotEmpty()
    readonly nome!: string

    @IsInt()
    @IsNotEmpty()
    readonly projetoId!: number
}
