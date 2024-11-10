import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RifasService } from './rifas.service';
import { CreateRifaDto } from './dto/create-rifa.dto';
import { UpdateRifaDto } from './dto/update-rifa.dto';

@Controller('rifas')
export class RifasController {
  constructor(private readonly rifasService: RifasService) {}

  @Post()
  create(@Body() createRifaDto: CreateRifaDto) {
    return this.rifasService.create(createRifaDto);
  }

  @Get()
  findAll() {
    return this.rifasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rifasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRifaDto: UpdateRifaDto) {
    return this.rifasService.update(id, updateRifaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rifasService.remove(id);
  }
}
