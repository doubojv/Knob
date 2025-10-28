// src/tmdb/tmdb.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { TmdbService } from './tmdb.service';

@Controller('search')
export class TmdbController {
  constructor(private readonly tmdbService: TmdbService) {}

  @Get('tmdb')
  async searchShows(@Query('query') query: string) {
    if (!query) {
      return [];
    }

    const apiKey = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(
      query,
    )}`;

    const response = await fetch(url);
    const data = await response.json();

    // retornamos apenas os campos que o front precisa
    return data.results.map((show) => ({
      tmdbId: show.id,
      title: show.name,
      overview: show.overview,
      posterPath: show.poster_path,
    }));
  }
}
