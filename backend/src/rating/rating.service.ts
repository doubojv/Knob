import { Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class RatingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRatingDto: CreateRatingDto) {
  return this.prisma.rating.create({
    data: {
      id_user: createRatingDto.id_user,
      id_show: createRatingDto.id_show?? null,
      id_season: createRatingDto.id_season?? null,
      rating: createRatingDto.rating,
      },
    });
  }

  findAll() {
    return this.prisma.rating.findMany({
      include: {
        user: true,
        show: true,
        season: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.rating.findUnique({
      where: { id },
      include: {
        user: true,
        show: true,
        season: true,
      },
    });
  }

  update(id: number, data: UpdateRatingDto) {
    return this.prisma.rating.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.rating.delete({
      where: { id },
    });
  }
}

