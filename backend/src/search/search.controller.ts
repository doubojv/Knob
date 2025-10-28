import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('tmdb')
  async searchTMDB(@Query('query') query: string) {
    if (!query) {
      return { results: [] };
    }
    return this.searchService.searchTMDB(query);
  }
}
