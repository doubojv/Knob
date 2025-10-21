import { Controller, Post, Get, Param } from '@nestjs/common';
import { ShowsService } from './shows.service';

@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Get(':tmdbId')
  async getShow(@Param('tmdbId') tmdbId: string) {
    return this.showsService.getShow(Number(tmdbId));
  }

  @Get()
  async getAllShows() {
    return this.showsService.getAllShows();
  }

  @Post('sync/:tmdbId')
  async syncShow(@Param('tmdbId') tmdbId: string) {
    const show = await this.showsService.syncShow(Number(tmdbId));
    return show;
  }
}
