import { IsNotEmpty } from 'class-validator';

export class BuildingDto {
  @IsNotEmpty()
  buildingName: string;
}
