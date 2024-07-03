import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dtos/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async registerUser(requestBody: CreateUserDto) {
    try {
      const userExists = await this.userService.findByUsername(
        requestBody.username,
      ); // Sửa từ findByUser thành findByUsername
      console.log(userExists);
      if (userExists) {
        throw new NotFoundException('Người dùng đã tồn tại! Vui lòng nhập tài khoản mới');
      }
      //hash pass
      const hashPasword = await bcrypt.hash(requestBody.password, 12);
      //create new user
      const newUser = await this.userService.create({
        username: requestBody.username,
        password: hashPasword,
      });
      console.log('newUser');
      return {
        success: true,
        message: 'Tạo tài khoản thành công',
        data: newUser,
      };
    } catch (error) {
      // Xử lý lỗi ở đây
      return {
        success: false,
        message: 'Đã xảy ra lỗi khi đăng ký tài khoản',
        error: error.message, // Trả về thông điệp lỗi cho client
      };
    }
  }
  async loginUser(requestBody: LoginUserDto) {
    try {
      const userExists = await this.userService.findByUsername(
        requestBody.username,
      ); // Sửa từ findByUser thành findByUsername
      console.log(userExists);
      if (!userExists) {
        throw new NotFoundException('Người dùng không tồn tại');
      }
      const isMatchPassword = await bcrypt.compare(
        requestBody.password,
        userExists.password,
      );
      if (!isMatchPassword) {
        throw new NotFoundException('Mật khẩu không chính xác ');
      }
      const payload = {
        id: userExists.id,
        username: userExists.username,
      };
      const access_token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      });
      return {
        statusCode: 1,
        message: 'Người dùng đã đăng nhập thành công!',
        access_token,
        data: {
          id: userExists.id,
          username: userExists.username,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Đã xảy ra lỗi khi đăng nhập',
        error: error.message, // Trả về thông điệp lỗi cho client
      };
    }
  }
  getCurrentUser(@Request() req) {
    console.log('req.currentUser', req.currentUser);
  }
}
