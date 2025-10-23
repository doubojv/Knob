import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';

@Injectable()
export class SeasonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSeasonDto: CreateSeasonDto) {
    return this.prisma.season.create({
      data: createSeasonDto,
      include: {
        episodes: true,
      },
    });
  }

  async findAll() {
    return this.prisma.season.findMany({
      include: {
        episodes: true,
      },
    });
  }

  async findOne(id: number) {
    const season = await this.prisma.season.findUnique({
      where: { id_season: id },
      include: {
        episodes: true,
      },
    });

    if (!season) {
      throw new NotFoundException(`Season with ID ${id} not found`);
    }

    return season;
  }

  async findByShowId(showId: number) {
    return this.prisma.season.findMany({
      where: { showId },
      include: {
        episodes: true,
      },
    });
  }

  async update(id: number, updateSeasonDto: UpdateSeasonDto) {
    const season = await this.prisma.season.findUnique({
      where: { id_season: id },
    });

    if (!season) {
      throw new NotFoundException(`Season with ID ${id} not found`);
    }

    return this.prisma.season.update({
      where: { id_season: id },
      data: updateSeasonDto,
      include: {
        episodes: true,
      },
    });
  }

  async remove(id: number) {
    const season = await this.prisma.season.findUnique({
      where: { id_season: id },
    });

    if (!season) {
      throw new NotFoundException(`Season with ID ${id} not found`);
    }

    return this.prisma.season.delete({
      where: { id_season: id },
    });
  }
}