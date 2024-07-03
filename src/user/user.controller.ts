// UserController
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  ClassSerializerInterceptor,
  UseInterceptors,
  Get,
  Patch,
  Delete,
  Param,
  Put,
  ParseIntPipe,
  UseGuards,
  ForbiddenException,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/loginUser.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';
import { User } from './user.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dtos/updateUser.dto';
@ApiTags('User')
@Controller('api')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
       type: CreateUserDto,
       description: 'Json structure for user object',
    })
  async registerUser(@Body() requestBody: CreateUserDto) {
    return this.authService.registerUser(requestBody);
  }

  @Post('/login')
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
       type: LoginUserDto,
       description: 'Json structure for user object',
    })
  loginUser(@Body() requestBody: LoginUserDto) {
    return this.authService.loginUser(requestBody);
  }

  @Get('/get_current_username')
  @ApiOperation({ summary: 'Get current user information' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved current user' })
  @ApiBearerAuth('JWT-auth')  // Ensure this matches the name in main.ts
  @UseGuards(AuthGuard)
  async getUser(@CurrentUser() currentUser:User) {
    
    console.log("getall_currentuser",currentUser)
    return currentUser;
  }

  @Get('/find_all_user')
  @ApiResponse({ status: 200, description: 'Successfully retrieved find all user' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  findAllUser(@CurrentUser() currentUser:User) {
    console.log("getall_currentuser",currentUser)
    return this.userService.findAll();
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Successfully retrieved user by Id' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  findOneUser(@Param('id', ParseIntPipe) id: number) {
    // console.log(typeof id)
    return this.userService.findOneById(id);
  }

  @Put('/:id')
  @ApiBearerAuth('JWT-auth')
  @ApiResponse({ status: 201, description: 'The record has been successfully updated.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
       type: UpdateUserDto,
       description: 'Json structure for user object',
    })
  @UseGuards(AuthGuard)
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() requestBody: any) {
    return this.userService.updateById(id, requestBody);
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Successfully removed user by Id' })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteById(id);
  }
 
  
}
