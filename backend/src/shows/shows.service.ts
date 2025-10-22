import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { TmdbService } from '../tmdb/tmdb.service';

@Injectable()
export class ShowsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tmdbService: TmdbService,
  ) {}

  // Sincroniza série com o TMDB
  async syncShow(tmdbId: number) {
    const showData = await this.tmdbService.getShowDetails(tmdbId);

    const show = await this.prisma.show.upsert({
      where: { tmdbId },
      update: {
        name: showData.name,
        posterPath: showData.poster_path,
        backdropPath: showData.backdrop_path,
        overview: showData.overview,
        firstAirDate: showData.first_air_date
          ? new Date(showData.first_air_date)
          : null,
        voteAverage: showData.vote_average,
        voteCount: showData.vote_count,
        tagline: showData.tagline,
        status: showData.status,
      },
      create: {
        tmdbId,
        name: showData.name,
        posterPath: showData.poster_path,
        backdropPath: showData.backdrop_path,
        overview: showData.overview,
        firstAirDate: showData.first_air_date
          ? new Date(showData.first_air_date)
          : null,
        voteAverage: showData.vote_average,
        voteCount: showData.vote_count,
        tagline: showData.tagline,
        status: showData.status,
      },
    });

    // Seasons
    for (const s of showData.seasons) {
      await this.prisma.season.upsert({
        where: { tmdbId: s.id },
        update: {
          name: s.name,
          overview: s.overview,
          seasonNumber: s.season_number,
          airDate: s.air_date ? new Date(s.air_date) : null,
          posterPath: s.poster_path,
          voteAverage: s.vote_average,
          showId: show.id_show,
        },
        create: {
          tmdbId: s.id,
          name: s.name,
          overview: s.overview,
          seasonNumber: s.season_number,
          airDate: s.air_date ? new Date(s.air_date) : null,
          posterPath: s.poster_path,
          voteAverage: s.vote_average,
          showId: show.id_show,
        },
      });
    }

    return show;
  }

  // Retorna todas as séries
  async getAllShows() {
    return this.prisma.show.findMany({
      include: { seasons: true },
    });
  }

  // Retorna uma série pelo TMDB ID
  async getShow(tmdbId: number) {
    return this.prisma.show.findUnique({
      where: { tmdbId },
      include: { seasons: true },
    });
  }
}
