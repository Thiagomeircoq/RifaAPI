import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRifaDto } from './dto/create-rifa.dto';
import { UpdateRifaDto } from './dto/update-rifa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rifa } from './rifas.entity';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { Ticket } from 'src/tickets/tickets.entity';

@Injectable()
export class RifasService {
  constructor(
    @InjectRepository(Rifa)
    private readonly rifaRepository: Repository<Rifa>,

    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async create(createRifaDto: CreateRifaDto): Promise<Rifa> {
    return await this.rifaRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const rifa = this.rifaRepository.create(createRifaDto);
        await transactionalEntityManager.save(rifa);

        const tickets = Array.from(
          { length: createRifaDto.max_ticket },
          (_, i) => ({
            ticket_number: i + 1,
            status: 'available',
            rifa: rifa,
          }),
        );

        await transactionalEntityManager.save(Ticket, tickets);

        return rifa;
      },
    );
  }

  findAll() {
    return this.rifaRepository.find();
  }

  findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    return this.rifaRepository.findOne({ where: { id } });
  }

  update(id: string, updateRifaDto: UpdateRifaDto) {
    return `This action updates a #${id} rifa`;
  }

  remove(id: string) {
    return `This action removes a #${id} rifa`;
  }
}
