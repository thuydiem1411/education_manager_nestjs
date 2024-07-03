import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoomDto } from './dto/crudRoom.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';
@ApiTags('Room')
@Controller('api/edu')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}
  @Post('create_new_room')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    type: CreateRoomDto,
    description: 'Json structure for user object',
  })
  @UseGuards(AuthGuard)
  async create(@Body() requestBody: RoomDto) {
    return this.roomService.createRoom(requestBody);
  }
  @Get('get_all_room')
  @ApiResponse({ status: 200, description: 'Successfully retrieved find all room' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  findAllRoom() {
    return this.roomService.findAllRoom();
  }
  @Get('get_room_byId')
  @ApiResponse({ status: 200, description: 'Successfully retrieved find all room' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  async getRoomById(@Query('id') id: number) {
    try {
      const room = await this.roomService.findRoomById(id);
      return room;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Put('edit_room_byId')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    type: UpdateRoomDto,
    description: 'Json structure for user object',
  })
  @UseGuards(AuthGuard)
  async updateRoom(@Query('id') id: number, @Body() requestBody: RoomDto) {
    const updatedRoom = await this.roomService.updateRoom(id, requestBody);
    return updatedRoom;
  }
  @Delete('delete_room_byId')
  @ApiResponse({ status: 200, description: 'Successfully removed find all building' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  deleteRoomByID(@Query('id')id:number){
    return this.roomService.deleteRoomByID(id)
  }
}
