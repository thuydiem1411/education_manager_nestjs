import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from 'src/building/building.entity';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CourseController } from './course.controller';

import { BuildingService } from 'src/building/building.service';

import { Course } from './course.entity';
import { CourseService } from './course.service';
import { Room } from 'src/room/room.entity';
import { RoomService } from 'src/room/room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, User, Building,Room])],
  controllers: [CourseController],
  providers: [CourseService, UserService, BuildingService,RoomService],
})
export class CourseModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
