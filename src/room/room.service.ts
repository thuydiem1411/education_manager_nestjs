import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { Repository } from 'typeorm';
import { RoomDto } from './dto/crudRoom.dto';
import { Building } from 'src/building/building.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(Building)
    private readonly buildingRepository: Repository<Building>,

  ) {}

  async createRoom(requestBody: RoomDto) {
    const { buildingId } = requestBody;
    try {
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
       // Tạo một đối tượng phòng từ dữ liệu yêu cầu
       const newRoom = this.roomRepository.create(requestBody);
       // Gán tòa nhà cho phòng mới
      newRoom.building = building;
      const savedRoom = await this.roomRepository.save(newRoom);
      console.log("savedRoom",savedRoom)
      return {
        resultCode: 1,
        message: 'Tạo phòng học thành công',
        data: savedRoom,
      };
    } catch (error) {
      console.log('error from auth create', error);
      throw new ForbiddenException('Tạo phòng học thất bại!');
    }
  }
  async findAllRoom() {
    try {
      const getAllRoom = await this.roomRepository.find();
      return {
        resutlCode: 1,
        message: 'Xem tất cả các khóa học thành công',
        data: { getAllRoom },
      };
    } catch (error) {
      console.log('error from auth get', error);
      throw new ForbiddenException('Xem tất cả phòng học thất bại!');
    }
  }
  async findRoomById(id: number) {
    const room = await this.roomRepository.findOne({ where: { id } });
    if (!room) {
      throw new NotFoundException('Không tìm thấy phòng với id đã cung cấp.');
    }
    return room;
  }
  async updateRoom(id: number, requestBody: RoomDto) {
    try {
      const room = await this.findRoomById(id);
      if (!room) {
        return {
          resultCode: -1,
          message: 'Không tìm thấy phòng học của id cung cấp',
          data: null,
        };
      }
      // Cập nhật thông tin của room
      room.roomName = requestBody.roomName;
      room.ipGateway = requestBody.ipGateway;
      room.ssid = requestBody.ssid;
      room.location = requestBody.location;

      // Lưu cập nhật vào cơ sở dữ liệu
      const updatedRoom = await this.roomRepository.save(room);

      // Trả về thông báo và dữ liệu phòng học đã được cập nhật
      return {
        resultCode: 1,
        message: 'Cập nhật phòng học thành công',
        data: updatedRoom,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  async deleteRoomByID(id: number) {
    try {
      const room = await this.findRoomById(id);
      if (!room) {
        throw new NotFoundException('Không tìm thấy phòng học của id cung cấp');
      }
      await this.roomRepository.remove(room);
      return { resultCode: 1, message: 'Xóa phòng học thành công', data: null };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
