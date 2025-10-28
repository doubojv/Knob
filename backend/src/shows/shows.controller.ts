import { Controller, Post, Get, Param } from '@nestjs/common';
import { ShowsService } from './shows.service';

@Controller('shows')
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}


  @Get(':id') // 👈 Use um nome de parâmetro genérico, ex: 'id'
  async getShowByIdShow(@Param('id') id: string) {
    // Chama a nova função do serviço. O frontend passa o ID primário.
    return this.showsService.getShowByIdShow(Number(id)); 
  }
  
  @Get(':tmdbId')
  async getShow(@Param('tmdbId') tmdbId: string) {
    return this.showsService.getShow(Number(tmdbId));
  }

  @Get('tmdb/:tmdbId')
  async findByTmdbId(@Param('tmdbId') tmdbId: number) {
  return this.showsService.getShowByTmdbid(+tmdbId);
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
