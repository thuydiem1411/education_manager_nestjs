import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Room } from "./room.entity";
import { LoggerMiddleware } from "src/middlewares/logger.middleware";
import { RoomService } from "./room.service";
import { RoomController } from "./room.controller";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.entity";
import { Building } from "src/building/building.entity";
import { BuildingService } from "src/building/building.service";


@Module({
    imports:[TypeOrmModule.forFeature([Room,User,Building])],
    controllers:[RoomController],
    providers:[RoomService,UserService,BuildingService]
    
})
export class RoomModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(LoggerMiddleware)
          .forRoutes('*');
      }
}