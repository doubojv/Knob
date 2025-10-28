import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SearchService {
  private readonly TMDB_API_KEY = process.env.TMDB_API_KEY;
  private readonly TMDB_URL = 'https://api.themoviedb.org/3/search/tv';

  constructor(private readonly httpService: HttpService) {}

  async searchTMDB(query: string) {
    const url = `${this.TMDB_URL}?api_key=${this.TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}`;
    const { data } = await firstValueFrom(this.httpService.get(url));

    return {
      results: data.results.map((item: any) => ({
        id: item.id,
        name: item.name,
        overview: item.overview,
        poster_path: item.poster_path,
      })),
    };
  }
}
