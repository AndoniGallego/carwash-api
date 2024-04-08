import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWashDto {

    @IsOptional()
    @IsDate()
    deletedAt?: Date;

    @IsOptional()
    @IsBoolean()
    deleted?: boolean;

    @IsNumber()
    userId: number;

    @IsString()
    patent: string;

}