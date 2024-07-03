import { IsNotEmpty } from "class-validator";


export class LessonDto{
    @IsNotEmpty()
    courseId:number
    @IsNotEmpty()
    lessonName:string
    @IsNotEmpty()
    trainer:string
    @IsNotEmpty()
    date:Date
    @IsNotEmpty()
    startedTime:Date
    @IsNotEmpty()
    endedTime:Date
    @IsNotEmpty()
    buildingId:number
    @IsNotEmpty()
    roomId:number
}