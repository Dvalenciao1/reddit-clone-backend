import { Post } from 'src/post/entities/post.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: String, nullable: false })
  name: string;

  @Column({ type: String, nullable: false })
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
