import { use } from 'passport';
import { Building } from 'src/building/building.entity';
import { Lesson } from 'src/lesson/lesson.entity';
import { Room } from 'src/room/room.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  courseName: string;
  @Column()
  trainer: string;
  @CreateDateColumn()
  startedDate: Date;
  @CreateDateColumn()
  endedDate: Date;
  @Column()
  create_by: string;
  @ManyToMany(() => Room, (room) => room.courses)
  @JoinTable()
  rooms: Room[];
  @ManyToMany(() => User, (user) => user.courses)
  @JoinTable()
  users: User[];
  @OneToMany(() => Lesson, (lesson) => lesson.course)
  lessons: Lesson[];
}
