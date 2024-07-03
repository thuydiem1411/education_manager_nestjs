import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateBuildingDto {
  @ApiProperty({
    example: 'ThuyLoi-HCM',
    required: true
 })
 @IsNotEmpty()
  buildingName: string;
}
