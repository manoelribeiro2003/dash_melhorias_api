import { IsNotEmpty, IsString } from "class-validator";

export class CreateTarefaDto {
    @IsString()
    @IsNotEmpty()
    readonly nome!: string;
}