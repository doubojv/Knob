import { Injectable } from '@nestjs/common';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { UpdateWatchlistDto } from './dto/update-watchlist.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class WatchlistService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createWatchlistDto: CreateWatchlistDto) {
    return this.prismaService.watchlist.create({
      data: createWatchlistDto,
    });
  }

  findAll() {
    return this.prismaService.watchlist.findMany();
  }

  findOne(userId: number, showId: number) {
    return this.prismaService.watchlist.findUnique({
      where: {
        id_user_id_show: {
          id_user: userId,
          id_show: showId,
        },
      },
    });
  }

  findByUserAndShow(userId: number, showId: number) {
    return this.prismaService.watchlist.findUnique({
      where: {
        id_user_id_show: {
          id_user: userId,
          id_show: showId,
        },
      },
    });
  }

  update(userId: number, showId: number, updateWatchlistDto: UpdateWatchlistDto) {
    return this.prismaService.watchlist.update({
      where: {
        id_user_id_show: {
          id_user: userId,
          id_show: showId,
        },
      },
      data: updateWatchlistDto,
    });
  }

  updateByUserAndShow(userId: number, showId: number, updateWatchlistDto: UpdateWatchlistDto) {
    return this.prismaService.watchlist.update({
      where: {
        id_user_id_show: {
          id_user: userId,
          id_show: showId,
        },
      },
      data: updateWatchlistDto,
    });
  }

  remove(userId: number, showId: number) {
    return this.prismaService.watchlist.delete({
      where: {
        id_user_id_show: {
          id_user: userId,
          id_show: showId,
        },
      },
    });
  }

  removeByUserAndShow(userId: number, showId: number) {
    return this.prismaService.watchlist.delete({
      where: {
        id_user_id_show: {
          id_user: userId,
          id_show: showId,
        },
      },
    });
  }
}
