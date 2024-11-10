import { Module } from '@nestjs/common';
import { RifasService } from './rifas.service';
import { RifasController } from './rifas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rifa } from './rifas.entity';
import { Ticket } from 'src/tickets/tickets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rifa, Ticket])],
  controllers: [RifasController],
  providers: [RifasService],
})
export class RifasModule {}
