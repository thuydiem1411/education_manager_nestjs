import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { LessonService } from "./lesson.service";
import { AuthGuard } from "src/guards/auth.guard";
import { LessonDto } from "./dto/lesson.dto";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateLessonDto } from "./dto/createLesson.dto";
@ApiTags('Lesson')
@Controller('api/edu')
export class LessonController{
    constructor(private readonly lessonService:LessonService){}
    @Post('create_new_lesson')
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
      })
      @ApiResponse({ status: 403, description: 'Forbidden.' })
      @ApiBearerAuth('JWT-auth')
      @ApiBody({
        type: CreateLessonDto,
        description: 'Json structure for user object',
      })
    @UseGuards(AuthGuard)
    createNewLesson(@Body()requestBody:LessonDto){
        return this.lessonService.createNewLesson(requestBody)
    }
    @Get('get_all_lesson_by_course')
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved find all lesson by course',
      })
      @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    getLessonsForCourse(@Query('idCourse')idCourse:number){
        return this.lessonService.getLessonsByCourseId(idCourse)
    }
    @Get('get_all_lesson')
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved find all lesson',
      })
      @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
    getAllLesson(){
        return this.lessonService.getAllLesson()
    }
    @Get(':id')
    @ApiResponse({
        status: 200,
        description: 'Successfully retrieved find all lesson by id',
      })
      @ApiBearerAuth('JWT-auth')
    @UseGuards(AuthGuard)
     findOneById(@Param('idLesson') courseId: number){
      return this.lessonService.findOneById(courseId);
    }
}