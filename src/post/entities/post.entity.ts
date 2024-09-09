import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
}
