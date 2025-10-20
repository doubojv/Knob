import { Controller, Post, Get, Param } from '@nestjs/common';
import { ShowsService } from './shows.service';

@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  // GET /shows/:tmdbId -> retorna uma série pelo TMDB ID
  @Get(':tmdbId')
  async getShow(@Param('tmdbId') tmdbId: string) {
    return this.showsService.getShow(Number(tmdbId));
  }

  // GET /shows -> retorna todas as séries
  @Get()
  async getAllShows() {
    return this.showsService.getAllShows();
  }

  // POST /shows/sync/:tmdbId -> sincroniza uma série pelo TMDB ID
  @Post('sync/:tmdbId')
  async syncShow(@Param('tmdbId') tmdbId: string) {
    const show = await this.showsService.syncShow(Number(tmdbId));
    return show;
  }
}
