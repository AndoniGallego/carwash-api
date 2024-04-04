import { IsNumber, MinLength } from "class-validator";

export class CreateUserDto {

    @MinLength(3)
    name: string;
    
    @IsNumber()
    @MinLength(8)
    phone: number;
    
    @MinLength(6)
    password: string;

    @MinLength(6)
    patent: string;

    role: string;
}
