import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  
  @Column({type: String, nullable: false})
  email: string;
  
  @Column({type: String, nullable: false})
  username: string;

  @Column({type: String, nullable: false})
  pasword: string;

  @Column({ type: Boolean, nullable: false, default: false })
  deleted: boolean;
  
  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
