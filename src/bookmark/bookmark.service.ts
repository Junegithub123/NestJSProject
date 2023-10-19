import { Injectable, NotFoundException } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Bookmark } from "../../bookmark.entity";
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
    constructor(
        @InjectRepository(Bookmark)
        private readonly bookmarkRepository: Repository<Bookmark>,
    ){}
   
    getBookmarks(
        userId: number
    ){
        const bookmarks = this.bookmarkRepository.find({
            where: {
              userId,
            },
          });
        
          return bookmarks;
    }

    getBookmarkById(
        userId: number, 
        bookmarkId: number
    ){
        const bookmarks = this.bookmarkRepository.findOne({
            where: {
                id: bookmarkId,
              userId,
            },
          });
        
          return bookmarks;
    }

    async createBookmarks(
        userId: number, 
        dto: CreateBookmarkDto
    ){
        const bookmark = this.bookmarkRepository.create({
            userId,
            ...dto
        });

        await this.bookmarkRepository.save(bookmark);
        return bookmark;
    }

    async editBookmarkById(
        userId: number, 
        bookmarkId: number,
        dto: EditBookmarkDto
    ){
        const bookmark =
        await this.bookmarkRepository.findOne({
          where: {
            id: bookmarkId,
          },
        });
  
      // check if Bookmark owns the bookmark
      if (!bookmark || bookmark.userId !== userId)
        throw new NotFoundException(
          'Access to resources denied',
        );
  
      // Update the Bookmark entity with the DTO properties
        if (dto.title) {
            bookmark.title = dto.title;
        }

        if (dto.description) {
            bookmark.description = dto.description;
        }

        if (dto.link) {
            bookmark.link = dto.link;
        }

        // Save the updated Bookmark
        const updatedBookmark = await this.bookmarkRepository.save(bookmark);
        return updatedBookmark;
    }

    async deleteBookmarkById(
        userId: number, 
        bookmarkId: number
    ){
        const bookmark =
        await this.bookmarkRepository.findOne({
          where: {
            id: bookmarkId,
          },
        });
  
      // check if Bookmark owns the bookmark
      if (!bookmark || bookmark.userId !== userId)
        throw new NotFoundException(
          'Access to resources denied',
        );
    
        await this.bookmarkRepository.delete(bookmark);
    }
}
