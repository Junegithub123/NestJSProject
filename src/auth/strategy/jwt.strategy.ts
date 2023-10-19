import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../../user.entity";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt'
){
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        config: ConfigService,         
        ){
        super({
            jwtFromRequest:
            ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: {
        sub: number,
        email: string
    }) {
        const user = 
            await this.userRepository.findOne({ 
                where: { 
                    id: payload.sub 
                }, 
            });
        delete user.hash;
        return user;
    }
}