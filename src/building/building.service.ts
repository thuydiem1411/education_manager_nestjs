import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from './building.entity';
import { Repository } from 'typeorm';
import { BuildingDto } from './dto/building.dto';
import { Room } from 'src/room/room.entity';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private readonly buildingRespository: Repository<Building>,
  ) {}
  async createBuilding(requestBody: BuildingDto) {
    try {
      // Nếu các roomId tồn tại, tiến hành tạo tòa nhà và thêm roomId vào tòa nhà
      const building = this.buildingRespository.create( requestBody );
      const saveBuilding = await this.buildingRespository.save(building);
      return {
        resultCode: 1,
        message: 'Tạo phòng học thành công',
        data: saveBuilding,
      };
    } catch (error) {
      throw error;
    }
  }
  async findAllBuilding() {
    try {
      const getAllBuilding = await this.buildingRespository.find({
        relations: ['rooms'],
      });
      console.log('getAllBuilding', getAllBuilding);
      return {
        resultCode: 1,
        message: 'Xem tất cả các tòa nhà thành công!',
        data: { getAllBuilding },
      };
    } catch (error) {
      throw error.message;
    }
  }
  async findBuildingbyId(id: number) {
    try {
      const buildingId = await this.buildingRespository.findOne({
        where: { id },
        relations: ['rooms'],
      });
      if (!buildingId) {
        return {
          resutlCode: -1,
          message: 'Id Tòa nhà không tồn tại',
          data: null,
        };
      }
      return {
        resutlCode: 1,
        message: 'Xem tòa nhà theo Id thành công!',
        data: buildingId,
      };
    } catch (error) {
      throw error.message;
    }
  }
}
