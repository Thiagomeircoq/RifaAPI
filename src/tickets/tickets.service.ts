import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './tickets.entity';
import { Repository, DataSource } from 'typeorm';
import { BuyTicketDto } from './dto/buy-ticket.dto';
import { User } from 'src/users/users.entity';
import { Rifa } from 'src/rifas/rifas.entity';
import { isUUID } from 'class-validator';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Rifa)
    private readonly rifaRepository: Repository<Rifa>,

    private readonly dataSource: DataSource,
  ) {}

  findAllByRifa(rifaId: string) {
    return this.ticketRepository.find({
      where: { rifa: { id: rifaId } },
    });
  }

  private validateUUID(rifaId: string) {
    if (!isUUID(rifaId)) {
      throw new BadRequestException('Invalid UUID format');
    }
  }

  private async findOrCreateUser(phone: string, name: string): Promise<User> {
    let user = await this.userRepository.findOne({ where: { phone } });

    if (!user) {
      user = this.userRepository.create({ phone, name });
      user = await this.userRepository.save(user);
    }

    return user;
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async buyTicket(buyTicketDto: BuyTicketDto) {
    const { rifaId, ticketQuantity, phone, name } = buyTicketDto;
    this.validateUUID(rifaId);

    const rifa = await this.rifaRepository.findOne({ where: { id: rifaId } });

    if (!rifa) {
      throw new NotFoundException('Rifa not found');
    }

    const user = await this.findOrCreateUser(phone, name);

    return await this.dataSource.transaction(async (manager) => {
      const availableTickets = await manager
        .createQueryBuilder(Ticket, 'ticket')
        .setLock('pessimistic_write')
        .where('ticket.rifa_id = :rifaId', { rifaId })
        .andWhere('ticket.status = :status', { status: 'available' })
        .getMany();

      if (availableTickets.length < ticketQuantity) {
        throw new BadRequestException('Not enough available tickets');
      }

      const shuffledTickets = this.shuffleArray(availableTickets).slice(
        0,
        ticketQuantity,
      );
      const ticketIds = shuffledTickets.map((ticket) => ticket.id);

      await manager
        .createQueryBuilder()
        .update(Ticket)
        .set({ user, status: 'purchased' })
        .whereInIds(ticketIds)
        .execute();

      const ticketNumbers = shuffledTickets.map(
        (ticket) => ticket.ticket_number,
      );

      return {
        message: `${ticketQuantity} tickets purchased successfully`,
        ticketNumbers,
      };
    });
  }
}
