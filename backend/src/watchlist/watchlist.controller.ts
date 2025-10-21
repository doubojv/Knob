import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import type { CreateWatchlistDto } from './dto/create-watchlist.dto';
import type { UpdateWatchlistDto } from './dto/update-watchlist.dto';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @Post()
  create(@Body() createWatchlistDto: CreateWatchlistDto) {
    return this.watchlistService.create(createWatchlistDto);
  }

  @Get()
  findAll() {
    return this.watchlistService.findAll();
  }

  @Get(':userId/:showId')
  findOne(
    @Param('userId') userId: string,
    @Param('showId') showId: string,
  ) {
    return this.watchlistService.findOne(+userId, +showId);
  }

  @Patch(':userId/:showId')
  update(
    @Param('userId') userId: string,
    @Param('showId') showId: string,
    @Body() updateWatchlistDto: UpdateWatchlistDto,
  ) {
    return this.watchlistService.update(+userId, +showId, updateWatchlistDto);
  }

  @Delete(':userId/:showId')
  remove(
    @Param('userId') userId: string,
    @Param('showId') showId: string,
  ) {
    return this.watchlistService.remove(+userId, +showId);
  }
}
