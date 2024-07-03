import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { Building } from "src/building/building.entity";
import { Course } from "src/course/course.entity";
import { Room } from "src/room/room.entity";
import { User } from "src/user/user.entity";
import { Lesson } from "./lesson.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseService } from "src/course/course.service";
import { UserService } from "src/user/user.service";
import { BuildingService } from "src/building/building.service";
import { RoomService } from "src/room/room.service";
import { LoggerMiddleware } from "src/middlewares/logger.middleware";
import { LessonController } from "./lesson.controller";
import { LessonService } from "./lesson.service";

@Module({
    imports: [TypeOrmModule.forFeature([Course, User, Building,Room,Lesson])],
  controllers: [LessonController],
  providers: [LessonService,CourseService, UserService, BuildingService,RoomService],
})
export class LessonModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
    }
  }


