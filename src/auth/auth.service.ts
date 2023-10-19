import { Injectable, BadRequestException, InternalServerErrorException  } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../user.entity";
import { AuthDto } from "./dto";
import * as argon2 from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwt: JwtService,
        private config: ConfigService,
    ) {}

    async signup(dto: AuthDto) {
        try {
            const existingUser = await this.userRepository.findOne({ where: { email: dto.email } });
    
            if (existingUser) {
                throw new BadRequestException('User with this email already exists');
            }
    
            const hash = await argon2.hash(dto.password);
    
            const newUser = this.userRepository.create({
                email: dto.email,
                hash: hash,
            });
    
            await this.userRepository.save(newUser);
            
            return this.signToken(newUser.id, newUser.email);
            //return { mesg: 'User signed up successfully' };
        } catch (error) {
            // Handle the error here
            // You can log the error or throw a different exception, if needed
            throw new InternalServerErrorException('An error occurred during signup');
        }
    }

    

    async signin(dto: AuthDto) {
        const user = await this.userRepository.findOne({ where: { email: dto.email } });

        if (!user) {
            throw new BadRequestException('User with this email does not exist');
        }

        const pwMatches = await argon2.verify(user.hash, dto.password);

        if (!pwMatches) {
            throw new BadRequestException('Invalid password');
        }

        return this.signToken(user.id, user.email);
        //return { mesg: 'I am signed in' };
    }

    async signToken(
        userId: number,
        email: string,
      ): Promise<{ access_token: string }> {
        const payload = {
          sub: userId,
          email,
        };
        const secret = this.config.get('JWT_SECRET');
    
        const token = await this.jwt.signAsync(
          payload,
          {
            expiresIn: '15m',
            secret: secret,
          },
        );
    
        return {
          access_token: token,
        };
    }
}







// async signup(dto: AuthDto) {
    //     const existingUser = await this.userRepository.findOne({ where: { email: dto.email } });

    //     if (existingUser) {
    //         throw new BadRequestException('User with this email already exists');
    //     }

    //     const hash = await argon2.hash(dto.password);

    //     const newUser = this.userRepository.create({
    //         email: dto.email,
    //         hash: hash,
    //     });

    //     await this.userRepository.save(newUser);

    //     return { mesg: 'User signed up successfully' };
    // }


// import { Injectable, BadRequestException } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { User } from "../../user.entity";
// import { AuthDto } from "./dto";
// import * as argon2 from 'argon2';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>, // Use Repository<User>
//   ) {}

//   async signup(dto: AuthDto) {
//     // Check if the user with the provided email already exists
//     const existingUser = await this.userRepository.findOne({
//         where: { email: dto.email }, // Use 'where' to specify the query condition
//       });

//     if (existingUser) {
//       throw new BadRequestException('User with this email already exists');
//     }

//     // Generate the password hash
//     const hash = await argon2.hash(dto.password);

//     // Create a new user entity
//     const newUser = this.userRepository.create({
//       email: dto.email,
//       hash: hash, // Assuming your hashed password should be stored in the 'hash' field
      
//     });

//     // Save the new user in the database
//     await this.userRepository.save(newUser);

//     return { mesg: 'User signed up successfully' };
//   }

//   signin() {
//     return { mesg: 'I am signed in' };
//   }
// }



















// import { Injectable } from "@nestjs/common";
// import { InjectRepository, InjectConnection } from "@nestjs/typeorm";
// import { Repository, Connection } from "typeorm";
// import { User } from "../../user.entity"; // Import your User entity
// import { AuthDto } from "./dto";
// import * as argon from 'argon2';


// @Injectable({})

// export class AuthService {
//     // constructor(
//     //     @InjectRepository(User)
//     //     private readonly userRepository: Repository<User>,
//     // ) {}

//     constructor(
//         @InjectConnection() private readonly connection: Connection // If using TypeORM
//       ) {}

      

//       async signup(dto: AuthDto) {
//         // generate the password hash
//         const hash = await argon.hash(dto.password);

//         //Save new user in db


//         //Return the seved User
//         return { mesg: 'I am signed up' };
//     }
//     signin(){
//         return { mesg: 'I am signed in' };
//     }
// }