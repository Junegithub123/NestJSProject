import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    //@Transform(({ value }) => value.trim())
    email: string;

    @IsString()
    @IsNotEmpty()
    //@Transform(({ value }) => value.trim())
    password: string;
}
















// import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

// export class AuthDto {
//     @IsEmail()
//     @IsNotEmpty()
//     email: string;

//     @IsString()
//     @IsNotEmpty()
//     password: string; 
// }