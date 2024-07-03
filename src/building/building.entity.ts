import { Course } from "src/course/course.entity";
import { Room } from "src/room/room.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Building{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    buildingName:string
    @OneToMany(() => Room, room => room.building)
    rooms: Room[];

};