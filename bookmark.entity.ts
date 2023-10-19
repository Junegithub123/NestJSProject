import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'user.entity';

@Entity({ name: 'bookmarks' })
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string | null;

  @Column()
  link: string;

  @ManyToOne(() => User, (user) => user.bookmarks)
  user: User;
}