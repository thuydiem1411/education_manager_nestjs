import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class UpdateRoomDto{
    @ApiProperty({
        example: '3',
        required: true,
      })
      @IsNotEmpty()
  buildingId:string
    @ApiProperty({
        example: 'Hội trường 202-SG1',
        required: true
     })
    @IsNotEmpty({message:'Tên phòng học không được bỏ trống'})
    roomName: string
    @ApiProperty({
        example: '',
        required: true
     })
    @IsNotEmpty()
    ipGateway:string
    @ApiProperty({
        example: '',
        required: true
     })
    @IsNotEmpty()
    ssid:string
    @ApiProperty({
        example: 'Hồ Chí Minh',
        required: true
     })
    @IsNotEmpty()
    location:string
}