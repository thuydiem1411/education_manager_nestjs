import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder, getConnection } from 'typeorm';
import { Course } from 'src/course/course.entity';
import { Building } from 'src/building/building.entity';
import { Room } from 'src/room/room.entity';
import { LessonDto } from './dto/lesson.dto';
import { randomUUID } from 'crypto';
import { Lesson } from './lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}
  async createNewLesson(requestBody: LessonDto) {
    const { courseId, buildingId, roomId } = requestBody;
    try {
      const lessons = await this.lessonRepository.find();
      const courses = await this.courseRepository.find();
      const buildings = await this.buildingRepository.find();
      console.log('lessons', lessons, courses, buildings);
      const parsedBuildingId = parseInt(buildingId.toString(), 10);
      const building = await this.buildingRepository.findOne({
        where: { id: parsedBuildingId },
      });
      if (!building) {
        return {
          resultCode: -1,
          message: 'Không tìm thấy tòa nhà theo Id cung cấp!!',
          data: null,
        };
      }
      const room = await this.roomRepository.findOne({
        where: { id: roomId, building: building },
      });
      if (!room) {
        return {
          resultCode: -1,
          message: 'Không tìm thấy phòng học theo Id cung cấp!!',
          data: null,
        };
      }
      const course = await this.courseRepository.findOne({
        where: { id: courseId },
      });
      if (!course) {
        return {
          resultCode: -1,
          message: 'Không tìm thấy khóa học theo Id cung cấp!!',
          data: null,
        };
      }
      const newLesson = await this.lessonRepository.create({
        ...requestBody,
      });
      const savedLesson = await this.lessonRepository.save(newLesson);
      return {
        resultCode: 1,
        message: 'Tạo phòng học thành công',
        data: savedLesson,
        buildingId: building.id,
        buildingName: building.buildingName,
        roomName: room.roomName,
        roomId: room.id,
        create_by: course.create_by,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getLessonsByCourseId(courseId: number) {
    try {
      if (!courseId) {
        return {
          resultCode: -1,
          message: 'Vui lòng nhập CourseId vào Params',
          data: null,
        };
      }
      const course = await this.courseRepository.findOne({
        where: { id: courseId },
      });
      if (!course) {
        return {
          resultCode: -1,
          message: 'CourseId không tồn tại!',
          data: null,
        };
      }
      const lessonByCourseId = await await this.lessonRepository
        .query(`SELECT LESSON.*,
        BUILDING."id" AS BUILDINGID,
      BUILDING."buildingName",
      ROOM."id" AS ROOMID,
      ROOM."roomName"
    FROM LESSON,
      COURSE_ROOMS_ROOM,
      ROOM,
      BUILDING
    WHERE LESSON."courseId" = ${courseId}
      AND LESSON."courseId" = COURSE_ROOMS_ROOM."courseId"
      AND COURSE_ROOMS_ROOM."roomId" = ROOM."id"
      AND ROOM."buildingId" = BUILDING."id"`);

      const data_return = lessonByCourseId.map((lesson) => ({
        ...lesson,
        create_by: course.create_by,
      }));
      console.log(
        'createQueryBuilder',
        await this.lessonRepository.query(`SELECT LESSON.*,
      ROOM."roomName",
      ROOM."id" AS ROOMID,
      BUILDING."id" AS BUILDINGID,
      BUILDING."buildingName"
    FROM LESSON,
      COURSE_ROOMS_ROOM,
      ROOM,
      BUILDING
    WHERE LESSON."courseId" = ${courseId}
      AND LESSON."courseId" = COURSE_ROOMS_ROOM."courseId"
      AND COURSE_ROOMS_ROOM."roomId" = ROOM."id"
      AND ROOM."buildingId" = BUILDING."id"`),
      );
      return {
        resultCode: 1,
        message: 'Xem buổi học thành công!',
        data: data_return,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }
  }
  async getAllLesson() {
    try {
      const lessons = await this.lessonRepository.find();
      console.log('lessonRepository', this.lessonRepository);
      console.log('lessons', lessons);
      return lessons;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }
  }
  findOneById(idLesson: number) {
    console.log(
      'this.lessonRepository.findOne({where:{idLesson}})',
      this.lessonRepository.findOne({ where: { idLesson } }),
    );
    return this.lessonRepository.findOne({ where: { idLesson } });
  }
}
