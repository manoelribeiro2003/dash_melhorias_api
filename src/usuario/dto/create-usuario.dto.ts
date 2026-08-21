import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUsuarioDto {
    @IsString()
    @IsNotEmpty()
    readonly nome!: string

    @IsEmail()
    @IsNotEmpty()
    readonly email!: string
}
