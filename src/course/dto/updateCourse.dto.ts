import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateCourseDto {
  @ApiProperty({
    example: 'Lập trình IOT',
    required: true,
  })
  @IsNotEmpty()
  courseName: string;
  @ApiProperty({
    example: 'Th.s Phạm Hồng Xuân',
    required: true,
  })
  @IsNotEmpty()
  trainer: string;
  @ApiProperty({
    example: '2023-07-29T00:00:00.000Z',
    required: true,
  })
  @IsNotEmpty()
  startedDate: Date;
  @ApiProperty({
    example: '2023-07-29T00:00:00.000Z',
    required: true,
  })
  @IsNotEmpty()
  endedDate: Date;
  @ApiProperty({
    example: '2',
    required: true,
  })
  @IsNotEmpty()
  buildingId: number;
  @ApiProperty({
    example: '42',
    required: true,
  })
  @IsNotEmpty()
  roomId: number;
}
