import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateApiDto {
    @IsNotEmpty()
    @IsString()
    license_plate: string | undefined
    @IsNotEmpty()
    @IsString()
    brand: string | undefined
    @IsNotEmpty()
    @IsString()
    model: string | undefined
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    daily_cost: number | undefined 
}
