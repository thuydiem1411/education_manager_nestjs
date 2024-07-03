import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Exclude } from 'class-transformer';
import { Course } from "src/course/course.entity";
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number
    @Column({type: 'varchar', length:'30'})
    username:string
    @Column({type: 'varchar'})
    @Exclude()
    password:string
    @ManyToMany(() => Course, (course) => course.users)
    courses: Course[];
}