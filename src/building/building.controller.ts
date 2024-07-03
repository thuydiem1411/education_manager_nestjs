import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { BuildingService } from './building.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { BuildingDto } from './dto/building.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBuildingDto } from './dto/createBuilding.dto';
@ApiTags('Building')
@Controller('api/edu')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post('create_new_building')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    type: CreateBuildingDto,
    description: 'Json structure for user object',
  })
  @UseGuards(AuthGuard)
  async createBuilding(@Body() requestBody: BuildingDto) {
    return this.buildingService.createBuilding(requestBody);
  }
  @Get('get_all_building')
  @ApiResponse({ status: 200, description: 'Successfully retrieved find all building' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  findAllBuilding() {
    return this.buildingService.findAllBuilding();
  }
  @Get('get_building_byId')
  @ApiResponse({ status: 200, description: 'Successfully retrieved find all building' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  findBuildingbyId(@Query('id') id: number) {
    return this.buildingService.findBuildingbyId(id);
  }
}
