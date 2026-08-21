import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
    
    @IsString()
    @IsNotEmpty()
    readonly nome!: string;

    @IsString()
    @IsNotEmpty()
    readonly filial!: string;

    @IsString()
    @IsNotEmpty()
    readonly mail!: string;

    @IsBoolean()
    @IsOptional()
    readonly dimensionamento?: boolean;

    @IsBoolean()
    @IsOptional()
    readonly setup_layout?: boolean;
}