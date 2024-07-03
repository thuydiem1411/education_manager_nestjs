import { IsNotEmpty } from 'class-validator';

export class CourseDto {
  @IsNotEmpty()
  courseName: string;
  @IsNotEmpty()
  trainer: string;
  @IsNotEmpty()
  startedDate: Date;
  @IsNotEmpty()
  endedDate: Date;
  @IsNotEmpty()
  buildingId: number;
  @IsNotEmpty()
  roomId: number;
}
