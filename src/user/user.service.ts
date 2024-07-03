import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'; // Import bcryptjs
import { User } from './user.entity';
import { use } from 'passport';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserService {
  constructor (@InjectRepository(User)private userRepo: Repository<User>){}
    //CRUD
 create(requestBody:CreateUserDto){
    
    const newUser= this.userRepo.create(requestBody)
    return this.userRepo.save(newUser)
}
findAll(){
    return this.userRepo.find()
}
findOneById(id: number) {
    return this.userRepo.findOneBy({ id});
}
findByUsername(username: string) {
    return this.userRepo.findOneBy({  username } );
}


async updateById(id:number,requestBody:any){
    let user= await this.findOneById(id)
    if(!user){
        throw new NotFoundException('Người dùng không tồn tại');
    }
    user = {...user, ...requestBody};
    return this.userRepo.save(user);
}
deleteById(id: number) {
    return this.userRepo.delete({ id });
}

}
