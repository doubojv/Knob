import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
  return this.prisma.review.create({
    data: {
      id_user: createReviewDto.id_user,
      id_show: createReviewDto.id_show?? null,
      id_season: createReviewDto.id_season?? null,
      rating: createReviewDto.rating,
      content: createReviewDto.content,
      },
    });
  }

  findAll() {
    return this.prisma.review.findMany({
      include: {
        user: true,
        show: true,
        season: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.review.findUnique({
      where: { id },
      include: {
        user: true,
        show: true,
        season: true,
      },
    });
  }

  update(id: number, data: UpdateReviewDto) {
    return this.prisma.review.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.review.delete({
      where: { id },
    });
  }
}
