import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDTO {
  @IsString()
  make: string;
  @IsString()
  model: string;
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;
  @IsNumber()
  @Min(0)
  @Max(5000000)
  mileage: number;
  @IsNumber()
  @IsLongitude()
  lng: number;
  @IsNumber()
  @IsLatitude()
  lat: number;
  @IsNumber()
  price: number;
}
