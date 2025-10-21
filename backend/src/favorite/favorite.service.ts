import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createFavoriteDto: CreateFavoriteDto) {
    return this.prismaService.favorite.create({
      data: createFavoriteDto,
    });
  }

  findAll() {
    return this.prismaService.favorite.findMany();
  }

  findOne(userId: number, showId: number) {
    return this.prismaService.favorite.findUnique({
      where: {
        id_user_id_show: {
          id_user: userId,
          id_show: showId,
        },
      },
    });
  }

  findByUserAndShow(userId: number, showId: number) {
    return this.prismaService.favorite.findUnique({
      where: {
        id_user_id_show: {
          id_user: userId,
          id_show: showId,
        },
      },
    });
  }

  update(userId: number, showId: number, updateFavoriteDto: UpdateFavoriteDto) {
    return this.prismaService.favorite.update({
      where: {
        id_user_id_show: {
          id_user: userId,
          id_show: showId,
        },
      },
      data: updateFavoriteDto,
    });
  }

  updateByUserAndShow(userId: number, showId: number, updateFavoriteDto: UpdateFavoriteDto) {
    return this.prismaService.favorite.update({
      where: {
        id_user_id_show: {
          id_user: userId,
          id_show: showId,
        },
      },
      data: updateFavoriteDto,
    });
  }

  remove(userId: number, showId: number) {
    return this.prismaService.favorite.delete({
      where: {
        id_user_id_show: {
          id_user: userId,
          id_show: showId,
        },
      },
    });
  }

  removeByUserAndShow(userId: number, showId: number) {
    return this.prismaService.favorite.delete({
      where: {
        id_user_id_show: {
          id_user: userId,
          id_show: showId,
        },
      },
    });
  }
}
