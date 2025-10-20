// tmdb.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TmdbService {
  private readonly apiKey = process.env.TMDB_API_KEY;
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  constructor(private readonly httpService: HttpService) {}

  async getShowDetails(tmdbId: number) {
    const url = `${this.baseUrl}/tv/${tmdbId}?language=en-US&api_key=${this.apiKey}`;
    const { data } = await this.httpService.axiosRef.get(url);
    return data;
  }

  async getSeasonDetails(tmdbId: number, seasonNumber: number) {
    const url = `${this.baseUrl}/tv/${tmdbId}/season/${seasonNumber}?language=en-US&api_key=${this.apiKey}`;
    const { data } = await this.httpService.axiosRef.get(url);
    return data;
  }
}
