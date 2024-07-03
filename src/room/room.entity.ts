import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from 'src/course/course.entity';
import { Building } from 'src/building/building.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomName: string;

  @Column()
  ipGateway: string;

  @Column()
  ssid: string;

  @Column()
  location: string;

  @Column()
  buildingId: number;

  @ManyToOne(() => Building, (building) => building.rooms)
  building: Building;
  
  @ManyToMany(() => Course, (course) => course.rooms)
  courses: Course[];
}
