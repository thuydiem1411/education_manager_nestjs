import { IsEmpty, IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";


export class RoomDto{
    @IsNotEmpty()
    buildingId:number
    @IsNotEmpty({message:'Tên phòng học không được bỏ trống'})
    roomName: string
    @IsEmpty()
    ipGateway:string
    @IsEmpty()
    ssid:string
    @IsNotEmpty()
    location:string
   
}