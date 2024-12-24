import { User } from "@/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Interaction {
    @PrimaryGeneratedColumn('uuid')
    id: number;
    
    @Column({type: String, nullable: false})
    vote_type: string;
    
    @ManyToOne(() => User, user => user.interactions)
    user: User;
    
    @CreateDateColumn()
    createdAt: Date;
}
