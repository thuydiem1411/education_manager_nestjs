import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class updateBuildingDto {
  @ApiProperty({
    example: 'ThuyLoi-HCM1',
    required: true
 })
 @IsNotEmpty()
  buildingName: string;

}
