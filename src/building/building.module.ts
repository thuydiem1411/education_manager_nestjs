import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Building } from "./building.entity";
import { LoggerMiddleware } from "src/middlewares/logger.middleware";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";

import { BuildingService } from "./building.service";
import { BuildingController } from "./building.controller";
import { Room } from "src/room/room.entity";
import { RoomService } from "src/room/room.service";

@Module({
    imports:[TypeOrmModule.forFeature([Building,User,Room])],
    controllers:[BuildingController],
    providers:[BuildingService,UserService,RoomService]
})
export class BuildingModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(LoggerMiddleware)
          .forRoutes('*');
      }
}