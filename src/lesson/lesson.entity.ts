import { Course } from 'src/course/course.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  idLesson: number;
  @Column()
  lessonName: string;
  @Column()
  trainer: string;
  @CreateDateColumn()
  date: Date;
  @CreateDateColumn()
  startedTime: Date;
  @CreateDateColumn()
  endedTime: Date;
  @Column()
  courseId: number;
  @ManyToOne(() => Course, (course) => course.lessons)
  course: Course;
}
