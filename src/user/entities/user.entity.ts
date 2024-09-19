import { Interaction } from 'src/interaction/entities/interaction.entity';
import { Post } from 'src/post/entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity'; // Add this import
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;
  
  @Index({ unique: true })
  @Column({type: String, nullable: false})
  email: string;
  
  @Index({ unique: true })
  @Column({type: String, nullable: false})
  username: string;

  @Column({type: String, nullable: false})
  pasword: string;

  @Column({ type: Boolean, nullable: false, default: false })
  deleted: boolean;
  
  @OneToMany(() => Post, post => post.user)
  posts: Post[];
  
  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
  
  @OneToMany(() => Interaction, interaction => interaction.user)
  interactions: Interaction[];
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
