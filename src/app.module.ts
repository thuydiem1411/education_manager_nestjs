import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/use.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RoomModule } from './room/room.module';
import { Room } from './room/room.entity';
import { Building } from './building/building.entity';
import { BuildingModule } from './building/building.module';
import { CourseModule } from './course/course.module';
import { Course } from './course/course.entity';
import { Lesson } from './lesson/lesson.entity';
import { LessonModule } from './lesson/lesson.module';


@Module({
  imports: [
    UserModule,
    RoomModule,
    BuildingModule,
    CourseModule,
    LessonModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: +configService.get('PG_PORT'),
        username: configService.get('PG_USERNAME'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_DATABASE_NAME'),
        entities: [User,Room,Building,Course,Lesson],
        synchronize: true,  
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
