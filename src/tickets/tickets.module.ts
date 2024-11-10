import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './tickets.entity';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { User } from 'src/users/users.entity';
import { Rifa } from 'src/rifas/rifas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, User, Rifa])],
  providers: [TicketsService],
  controllers: [TicketsController],
})
export class TicketsModule {}
