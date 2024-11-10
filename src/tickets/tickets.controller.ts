import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { BuyTicketDto } from './dto/buy-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('rifa/:id')
  findAllByRifa(@Param('id') idRifa: string) {
    return this.ticketsService.findAllByRifa(idRifa);
  }

  @Post('/buy')
  buyTicket(@Body() buyTicketDto: BuyTicketDto) {
    return this.ticketsService.buyTicket(buyTicketDto);
  }
}
