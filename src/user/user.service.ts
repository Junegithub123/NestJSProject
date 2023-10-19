import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../../user.entity";
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Update the user entity with the DTO properties
    if (dto.email) {
        user.email = dto.email;
    }

    if (dto.firstName) {
        user.firstName = dto.firstName;
    }

    if (dto.lastName) {
        user.lastName = dto.lastName;
    }

    // Save the updated user
    const updatedUser = await this.userRepository.save(user);

    // You may want to remove sensitive information like 'hash' here
    delete updatedUser.hash;

    return updatedUser;
  }
}

















// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from "@nestjs/typeorm";
// import { Repository } from "typeorm";
// import { User } from "../../user.entity";
// import { EditUserDto } from './dto';

// @Injectable()
// export class UserService {
//   constructor(
//         @InjectRepository(User)
//         private readonly userRepository: Repository<User>,
//     ) {}

//   async editUser(
//     userId: number,
//     dto: EditUserDto,
//   ) {
//     const user = await this.userRepository.update({
//       where: {
//         id: userId,
//       },
//       data: {
//         ...dto,
//       },
//     });

//     delete user.hash;

//     return user;
//   }
// }