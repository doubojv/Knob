import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';

@Injectable()
export class EpisodeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEpisodeDto: CreateEpisodeDto) {
    return this.prisma.episode.create({
      data: createEpisodeDto,
    });
  }

  async findAll() {
    return this.prisma.episode.findMany();
  }

  async findOne(id: number) {
    const episode = await this.prisma.episode.findUnique({
      where: { id: id },
    });

    if (!episode) {
      throw new NotFoundException(`Episode with ID ${id} not found`);
    }

    return episode;
  }

  async findBySeasonId(seasonId: number) {
    return this.prisma.episode.findMany({
      where: { seasonId },
    });
  }

  async update(id: number, updateEpisodeDto: UpdateEpisodeDto) {
    const episode = await this.prisma.episode.findUnique({
      where: { id: id },
    });

    if (!episode) {
      throw new NotFoundException(`Episode with ID ${id} not found`);
    }

    return this.prisma.episode.update({
      where: { id: id },
      data: updateEpisodeDto,
    });
  }

  async remove(id: number) {
    const episode = await this.prisma.episode.findUnique({
      where: { id: id },
    });

    if (!episode) {
      throw new NotFoundException(`Episode with ID ${id} not found`);
    }

    return this.prisma.episode.delete({
      where: { id: id },
    });
  }
}