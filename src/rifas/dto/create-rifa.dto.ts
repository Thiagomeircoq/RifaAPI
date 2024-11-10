import { IsString, IsNumber, Min, IsPositive, IsInt } from 'class-validator';

export class CreateRifaDto {
  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsNumber()
  @IsPositive()
  ticket_price: number;

  @IsInt()
  @Min(1)
  min_ticket: number;

  @IsInt()
  @Min(1)
  max_ticket: number;

  @IsString()
  description: string;
}
