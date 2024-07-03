import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginUserDto {
  @ApiProperty({
    example: 'thuydiem2k2@gmail.com.vn',
    required: true
 })
  @IsEmail({}, { message: 'Người dùng không hợp lệ' })
  username: string;
  @ApiProperty({
    example: 'thuydiem2k2',
    required: true
 })
  @IsNotEmpty({message:'Mật khẩu không được bỏ trống'})
  password: string;
}
