import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CourseDto } from './dto/course.dto';
import { CurrentUser } from 'src/user/decorators/currentUser.decorator';
import { User } from 'src/user/user.entity';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCourseDto } from './dto/createCourse.dto';
import { UpdateCourseDto } from './dto/updateCourse.dto';
@ApiTags('Course')
@Controller('api/edu')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Post('create_new_course')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    type: CreateCourseDto,
    description: 'Json structure for user object',
  })
  @UseGuards(AuthGuard)
  createCourse(
    @Body() requestBody: CourseDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.courseService.createCourse(requestBody, currentUser);
  }
  @Get('get_all_course')
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved find all building',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  getAllCourse() {
    return this.courseService.getAllCoursesWithRoomsAndBuildings();
  }
  @Get('get_byId_course')
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved find all building',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  findCourseById(@Query('idCourse') idCourse: number) {
    return this.courseService.findCourseById(idCourse);
  }
  @Put('edit_byId_course')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({
    type: UpdateCourseDto,
    description: 'Json structure for user object',
  })
  @UseGuards(AuthGuard)
  putCourseById(
    @Query('idCourse') idCourse: number,
    @Body() requestBody: CourseDto,
  ) {
    return this.courseService.putCourseById(idCourse, requestBody);
  }
  @Delete('delete_course_byId')
  @ApiResponse({ status: 200, description: 'Successfully retrieved find all course' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  deleteCourseById(@Query('idCourse') idCourse: number) {
    return this.courseService.deleteCourseById(idCourse);
  }
}
