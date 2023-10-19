import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { User } from 'user.entity'; // Import your User entity
import { Bookmark } from 'bookmark.entity'; // Import your Bookmark entity



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UserModule,
    BookmarkModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'learning_nestjs_project',
      entities: [User, Bookmark], // Add your entity classes here
      synchronize: true, // set to false in production
    }),
  ],
})
export class AppModule {}