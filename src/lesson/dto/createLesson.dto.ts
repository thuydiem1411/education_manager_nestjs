import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty } from "class-validator";
import { PrimaryColumn } from "typeorm";
import { ids } from "webpack";

export class CreateLessonDto{
    @ApiProperty({
        example: '2',
        required: true,
    })
    @IsNotEmpty()
    courseId:number
    @ApiProperty({
        example: 'Buổi 10',
        required: true,
      })
    @IsNotEmpty()
    lessonName:string
    @ApiProperty({
        example: 'Th.s Phạm Hồng Xuân',
        required: true,
      })
    @IsNotEmpty()
    trainer:string
    @ApiProperty({
        example: '2023-07-29T00:00:00.000Z',
        required: true,
      })
    @IsNotEmpty()
    date:Date
    @ApiProperty({
        example: '2023-07-29T00:00:00.000Z',
        required: true,
      })
    @IsNotEmpty()
    startedTime:Date
    @ApiProperty({
        example: '2023-07-29T00:00:00.000Z',
        required: true,
      })
    @IsNotEmpty()
    endedTime:Date
    @ApiProperty({
        example: '3',
        required: true,
      })
    @IsNotEmpty()
    buildingId:number
    @ApiProperty({
        example: '3',
        required: true,
      })
    @IsNotEmpty()
    roomId:number
}