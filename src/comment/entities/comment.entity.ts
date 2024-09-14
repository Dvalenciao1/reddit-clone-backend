import { Post } from "src/post/entities/post.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    
    @Column({type: String, nullable: false})
    content: string;
    
    @ManyToOne(() => User, user => user.comments)
    user: User;
    
    @ManyToOne(() => Post, post => post.comments)
    post: Post;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}
