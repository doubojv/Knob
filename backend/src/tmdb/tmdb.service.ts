// tmdb.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TmdbService {
  private readonly API_KEY = process.env.TMDB_API_KEY;
  private readonly BASE_URL = 'https://api.themoviedb.org/3';

  async getShowDetails(tmdbId: number) {
    const url = `${this.BASE_URL}/tv/${tmdbId}?api_key=${this.API_KEY}&language=en-US`;
    const response = await fetch(url);
    return response.json();
  }

  async getShowCast(tmdbId: number) {
    const url = `${this.BASE_URL}/tv/${tmdbId}/credits?api_key=${this.API_KEY}&language=en-US`;
    const response = await fetch(url);
    return response.json();
  }

  async getSeasonDetails(showTmdbId: number, seasonNumber: number) {
    const url = `${this.BASE_URL}/tv/${showTmdbId}/season/${seasonNumber}?api_key=${this.API_KEY}&language=en-US`;
    const response = await fetch(url);
    return response.json();
  }
}
