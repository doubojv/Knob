import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLogDto: CreateLogDto) {
    return this.prisma.log.create({
      data: createLogDto,
    });
  }
  
  findAll() {
    return this.prisma.log.findMany({
      include: {
        user: true,
        show: true,
        season: true,
        rating: true,
        review: true, 
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.log.findUnique({
      where: { id },
      include: {
        user: true,
        show: true,
        season: true,
        review: true,
        rating: true,
      },
    });
  }

  async update(id: number, updateLogDto: UpdateLogDto) {
    return this.prisma.log.update({
      where: { id },
      data: updateLogDto,
    });
  }

  async remove(id: number) {
    return this.prisma.log.delete({
      where: { id },
    });
  }
}
