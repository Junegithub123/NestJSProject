import { Body, Controller, Get, UseGuards, Patch } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { User } from 'user.entity';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {    
    constructor (private userService: UserService){}
    @Get('me')
    getMe(@GetUser() user: User) {        
        return user;
    }

    @Patch()
    editUser(
        @GetUser('id') userId: number,
        @Body() dto: EditUserDto
    ) {
        return this.userService.editUser(userId, dto);
    }
}
