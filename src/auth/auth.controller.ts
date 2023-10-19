import { Body, Controller,  HttpCode, HttpStatus, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from "express";
import { AuthDto } from "./dto";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() dto: AuthDto) {
        
        return await this.authService.signup(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signin(@Body() dto: AuthDto) {
        return await this.authService.signin(dto);
    }
}












// import { Body, Controller, Post, BadRequestException, HttpStatus } from "@nestjs/common";
// import { AuthService } from "./auth.service";
// import { AuthDto } from "./dto";

// @Controller('auth')
// export class AuthController {
//     constructor(private authService: AuthService) {}
     
//     // @Post('signup')
//     // async signup(@Body() dto: AuthDto){
//     //     console.log({
//     //         dto,
//     //     });
//     //     return await this.authService.signup(dto); // Pass the 'dto' object to the signup method
//     // }

//     @Post('signup')
//     async signup(@Body() dto: AuthDto) {
//         try {
//             console.log({
//                 dto,
//             });
//             return await this.authService.signup(dto); // Pass the 'dto' object to the signup method
//         } catch (error) {
//             // Handle validation error and return a custom response
//             if (error instanceof BadRequestException) {
//                 // Extract the validation errors from the error message
//                 const validationErrors = error.getResponse();
    
//                 // Log the validation errors for debugging
//                 console.error('Validation Error:', validationErrors);
    
//                 // Return a custom response with the validation errors
//                 throw new BadRequestException({
//                     status: HttpStatus.BAD_REQUEST,
//                     error: 'Validation failed',
//                     data: validationErrors,
//                 });
//             } else {
//                 // Handle other types of errors as needed
//                 throw error; // Re-throw the original error for other types of exceptions
//             }
//         }
//     }

//     @Post('signin')
//     signin(){
//         return this.authService.signin();
//     }
// }











// import { Body, Controller, Post, Req } from "@nestjs/common";
// import { AuthService } from "./auth.service";
// import { Request } from "express";
// import { AuthDto } from "./dto";


// @Controller('auth')

// export class AuthController {
//     constructor(private authService: AuthService) {}
     
//     @Post('signup')
//     // signup(@Req() req: Request){
//     //    console.log(req);
//     //     return this.authService.signup ();
//     // }
//     signup(@Body() dto: AuthDto){
//         console.log({
//             dto,
//         });
//         return this.authService.signup();
//     }
//     @Post('signin')
//     signin(){
//         return this.authService.signin();
//     }
// }