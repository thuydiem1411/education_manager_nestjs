import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { LoggerMiddleware } from "src/middlewares/logger.middleware";
import { AuthService } from "./auth.service";
import { UsersController } from "./user.controller";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports:[TypeOrmModule.forFeature([User]),JwtModule.register({
        global: true,
        signOptions: { expiresIn: '1h' },
      })
      
    ],
      
    controllers:[UsersController],
    providers:[UserService,AuthService]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(LoggerMiddleware)
          .forRoutes('*');
      }
}

