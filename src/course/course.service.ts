// course.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';
import { Building } from 'src/building/building.entity';
import { Room } from 'src/room/room.entity';
import { CourseDto } from './dto/course.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(User) private readonly userRepository: Repository<User>, // Fixed typo
  ) {}

  async createCourse(requestBody: CourseDto, currentUser: User) {
    const { buildingId, roomId } = requestBody;
    try {
      const parsedBuildingId = parseInt(buildingId.toString(), 10);
      const parsedRoomId = parseInt(roomId.toString(), 10);
      // Kiểm tra sự tồn tại của building
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

      // Kiểm tra sự tồn tại của room trong building
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

      // Tạo một đối tượng Course từ requestBody và gán thông tin người dùng hiện tại
      const newCourse = this.courseRepository.create({
        ...requestBody,
        create_by: currentUser.username, // Assuming create_by is the username of the current user
      });
      newCourse.rooms = [room];

      // Lưu khóa học vào cơ sở dữ liệu
      const createdCourse = await this.courseRepository.save(newCourse);
      const buildingCourse = await this.buildingRepository.findOne({
        where: { id: createdCourse.rooms[0].buildingId },
      });
      const { rooms, ...dataCourse } = createdCourse; // Xóa trường "rooms"
      dataCourse['buildingName'] = buildingCourse.buildingName;
      dataCourse['roomName'] = createdCourse.rooms[0].roomName;
      return dataCourse;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async getAllCoursesWithRoomsAndBuildings() {
    try {
      // Sử dụng find() để lấy tất cả các khóa học kèm thông tin về phòng học và tòa nhà
      const allCourses = await this.courseRepository.find({
        relations: ['rooms', 'rooms.building'], // Load thông tin về phòng học và tòa nhà
      });

      // Duyệt qua từng khóa học và xây dựng đúng định dạng kết quả trả về
      const formattedCourses = allCourses.map((course) => {
        const room = course.rooms.length > 0 ? course.rooms[0] : null;
        return {
          courseName: course.courseName,
          trainer: course.trainer,
          startedDate: course.startedDate,
          endedDate: course.endedDate,
          create_by: course.create_by,
          couserId: course.id,
          buildingId: room ? room.buildingId : null,
          buildingName: room
            ? room.building
              ? room.building.buildingName
              : null
            : null,
          roomId: room ? room.id : null,
          roomName: room ? room.roomName : null,
        };
      });

      return formattedCourses;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findCourseById(idCourse: number) {
    try {
      // Kiểm tra xem idCourse có tồn tại không
      if (!idCourse) {
        throw new HttpException(
          'Vui lòng cung cấp idCourse',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Tìm kiếm khóa học bằng idCourse
      const course = await this.courseRepository.findOne({
        where: { id:idCourse },
        relations: ['rooms', 'rooms.building'], // Load thông tin về phòng học và tòa nhà
      });

      // Nếu không tìm thấy khóa học
      if (!course) {
        throw new HttpException(
          'Không tìm thấy khóa học',
          HttpStatus.NOT_FOUND,
        );
      }

      // Trả về thông tin của khóa học
      const room = course.rooms.length > 0 ? course.rooms[0] : null;
      return {
        courseName: course.courseName,
        trainer: course.trainer,
        startedDate: course.startedDate,
        endedDate: course.endedDate,
        create_by: course.create_by,
        idCourse: course.id,
        buildingId: room ? room.buildingId : null,
        buildingName: room
          ? room.building
            ? room.building.buildingName
            : null
          : null,
        roomId: room ? room.id : null,
        roomName: room ? room.roomName : null,
      };
    } catch (error) {
      // Nếu có lỗi xảy ra
      throw new HttpException(
        'Lỗi khi tìm kiếm khóa học',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async putCourseById(idCourse: number, requestBody: CourseDto) {
    const { buildingId, roomId } = requestBody;
    try {
      const parsedBuildingId = parseInt(buildingId.toString(), 10);
      if (!idCourse) {
        throw new HttpException(
          'Vui lòng cung cấp idCourse',
          HttpStatus.BAD_REQUEST,
        );
      }

      const course = await this.courseRepository.findOne({
        where: { id: idCourse },
      });

      if (!course) {
        throw new HttpException('Khóa học không tồn tại', HttpStatus.NOT_FOUND);
      }

      // Kiểm tra sự tồn tại của building
      const building = await this.buildingRepository.findOne({
        where: { id: parsedBuildingId },
      });
      if (!building) {
        throw new HttpException(
          'Building không tồn tại',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Kiểm tra sự tồn tại của room trong building
      const room = await this.roomRepository.findOne({
        where: { id: requestBody.roomId, building: building },
      });
      if (!room) {
        throw new HttpException(
          'Room không tồn tại trong building',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Merge dữ liệu từ requestBody vào khóa học
      const dataUpdateCourser = await this.courseRepository.merge(
        course,
        requestBody,
      );
      console.log(
        ' this.courseRepository.merge(course, requestBody)',
        this.courseRepository.merge(course, requestBody),
      );
      // Lưu khóa học đã cập nhật vào cơ sở dữ liệu
      dataUpdateCourser.rooms = [room];

      const updatedCourse = await this.courseRepository.save(dataUpdateCourser);
      const buildingCourse = await this.buildingRepository.findOne({
        where: { id: updatedCourse.rooms[0].buildingId },
      });
      const { rooms, ...dataCourseUpdate } = updatedCourse; // Xóa trường "rooms"
      dataCourseUpdate['buildingName'] = buildingCourse.buildingName;
      dataCourseUpdate['roomName'] = updatedCourse.rooms[0].roomName;
      return dataCourseUpdate;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async deleteCourseById(idCourse: number) {
    try {
      if (!idCourse) {
        throw new HttpException(
          'Vui lòng cung cấp idCourse',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      const course = await this.courseRepository.findOne({where:{id:idCourse}});
  
      if (!course) {
        return {
          resultCode: -1,
          message: 'Không tìm thấy khóa học',
          data: null,
        };
      }
  
      await this.courseRepository.remove(course);
      return {
        resultCode: 1,
        message: 'Xóa khóa học thành công',
        data: null,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
}
