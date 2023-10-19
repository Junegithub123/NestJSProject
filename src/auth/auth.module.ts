import { Module } from "@nestjs/common";
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User } from "../../user.entity";
import { JwtStrategy } from "./strategy";

@Module ({
    imports: [
        JwtModule.register({
            // secret: 'your-secret-key', // Replace with your secret key
            // signOptions: { expiresIn: '1h' }, // Define token expiration time
        }),
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})

export class AuthModule {}