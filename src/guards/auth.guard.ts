import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      //Step 1: Get token from header
      const token = request.headers.authorization.split(' ')[1];
      // console.log('token', token);

      if (!token) {
        throw new ForbiddenException('Vui lòng cung cấp Access_token');
      }
      //step2: jwtVerìy validation token
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // console.log('payload', payload);
      //step 3: find user in db based on jwtVerify
      const user = await this.userService.findByUsername(payload.username);
      //  console.log('user', user);
      if (!user) {
        throw new BadRequestException(
          'Người dùng không thuộc về mã thông báo.Vui lòng hãy thử lại!',
        );
      }
      //step 4: assign user to request object
      request.currentUser = user;
      // console.log('request.currentUser = user;', user);
     
    } catch (error) {
      // console.log('error from auth guard', error);
      throw new ForbiddenException('Token không hợp lệ hoặc hết hạn');
    }
    return true;
  }
}
