import { Comment } from "src/comment/entities/comment.entity";
import { Topic } from "src/topics/entities/topic.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    
    @Column({type: String, nullable: false})
    title: string;
    
    @Column({type: String, nullable: false})
    content: string;
    
    @ManyToOne(() => User, user => user.posts)
    user: User;
    
    @ManyToOne(() => Topic, topic => topic.posts)
    topic: Topic;
    
    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[];
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
}
