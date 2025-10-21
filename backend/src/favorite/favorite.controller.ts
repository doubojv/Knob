import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import type { CreateFavoriteDto } from './dto/create-favorite.dto';
import type { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteService.create(createFavoriteDto);
  }

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Get(':userId/:showId')
  findOne(
    @Param('userId') userId: string,
    @Param('showId') showId: string,
  ) {
    return this.favoriteService.findOne(+userId, +showId);
  }

  @Patch(':userId/:showId')
  update(
    @Param('userId') userId: string,
    @Param('showId') showId: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    return this.favoriteService.update(+userId, +showId, updateFavoriteDto);
  }

  @Delete(':userId/:showId')
  remove(
    @Param('userId') userId: string,
    @Param('showId') showId: string,
  ) {
    return this.favoriteService.remove(+userId, +showId);
  }
}
