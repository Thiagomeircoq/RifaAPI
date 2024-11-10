import {
  IsString,
  IsPositive,
  IsInt,
  IsPhoneNumber,
  IsNotEmpty,
} from 'class-validator';

export class BuyTicketDto {
  @IsString()
  @IsNotEmpty()
  rifaId: string;

  @IsInt()
  @IsPositive()
  ticketQuantity: number;

  @IsPhoneNumber('BR')
  phone: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
