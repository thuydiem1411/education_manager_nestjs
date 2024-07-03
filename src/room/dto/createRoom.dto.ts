import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    example: '3',
    required: true,
  })
  @IsNotEmpty()
  buildingId:number
  @ApiProperty({
    example: 'Hội trường 202-SG',
    required: true,
  })
  @IsNotEmpty({ message: 'Tên phòng học không được bỏ trống' })
  roomName: string;
  @ApiProperty({
    example: '',
  })
  @IsNotEmpty()
  ipGateway: string;
  @ApiProperty({
    example: '',
  })
  @IsNotEmpty()
  ssid: string;
  @ApiProperty({
    example: 'Hồ Chí Minh',
    required: true,
  })
  @IsNotEmpty()
  location: string;
}
