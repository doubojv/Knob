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
  private determineCategory(genres: Array<{ id: number; name: string }>): string {
    const genreNames = genres?.map(g => g.name) ?? [];
    const hasDrama = genreNames.includes('Drama');
    const hasComedy = genreNames.includes('Comedy');

    if (hasDrama && hasComedy) return 'Drama, Comedy';
    if (hasDrama) return 'Drama';
    if (hasComedy) return 'Comedy';
    return 'Other';
  }

  async syncShow(tmdbId: number) {
    const [showData, creditsData] = await Promise.all([
      this.tmdbService.getShowDetails(tmdbId),
      this.tmdbService.getShowCast(tmdbId),
    ]);

    const seasonsArray = Array.isArray(showData.seasons) ? showData.seasons : [];
    const computedNumberOfEpisodes = showData.number_of_episodes ?? (seasonsArray.reduce((acc: number, s: any) => acc + (s.episode_count ?? 0), 0) || null);


    const showUpdate = {
      name: showData.name,
      originalName: showData.original_name,
      posterPath: showData.poster_path,
      backdropPath: showData.backdrop_path,
      overview: showData.overview,
      firstAirDate: showData.first_air_date ? new Date(showData.first_air_date) : null,
      lastAirDate: showData.last_air_date ? new Date(showData.last_air_date) : null,
      numberOfSeasons: showData.number_of_seasons,
      numberOfEpisodes: computedNumberOfEpisodes,
      episodeRunTime: showData.episode_run_time,
      inProduction: showData.in_production,
      creators: showData.created_by,
      cast: creditsData.cast?.slice(0, 10), // Primeiros 10 atores principais
      genres: showData.genres,
      category: this.determineCategory(showData.genres),
      networks: showData.networks,
      productionCompanies: showData.production_companies,
      originCountry: showData.origin_country,
      originalLanguage: showData.original_language,
      spokenLanguages: showData.spoken_languages,
      popularity: showData.popularity,
      status: showData.status,
      tagline: showData.tagline,
      type: showData.type,
      voteAverage: showData.vote_average,
      voteCount: showData.vote_count,
      adult: showData.adult,
      homepage: showData.homepage,
    };

    const show = await this.prisma.shows.upsert({
      where: { tmdbId },
      update: showUpdate,
      create: {
        tmdbId,
        ...showUpdate,
      },
    });

    // Determine primary key value for the show returned by Prisma.
    // Depending on Prisma client generation the field may be `id_show` or normalized to `id`.
    const showPk: number = (show as any).id_show ?? (show as any).id;

    // Seasons: upsert all seasons returned by TMDB for this show.
    // This is idempotent: repeated /sync will update existing seasons.
    if (Array.isArray(showData.seasons)) {
      const seasonUpserts = showData.seasons.map((s: any) => {
        return this.prisma.season.upsert({
          where: { tmdbId: s.id },
          update: {
            name: s.name,
            overview: s.overview,
            seasonNumber: s.season_number,
            airDate: s.air_date ? new Date(s.air_date) : null,
            posterPath: s.poster_path,
            voteAverage: s.vote_average,
            numberOfEpisodes: s.episode_count ?? null,
            showId: showPk,
          },
          create: {
            tmdbId: s.id,
            name: s.name,
            overview: s.overview,
            seasonNumber: s.season_number,
            airDate: s.air_date ? new Date(s.air_date) : null,
            posterPath: s.poster_path,
            voteAverage: s.vote_average,
            numberOfEpisodes: s.episode_count ?? null,
            showId: showPk,
          },
        });
      });

      // Run season upserts in parallel but wait for completion
      const seasons = await Promise.all(seasonUpserts);

      // After seasons are synced, sync episodes for each season
      for (const season of seasons) {
        await this.syncSeasonEpisodes(tmdbId, season.seasonNumber, season.id_season);
      }
    }

    return show;
  }

  private async syncSeasonEpisodes(showTmdbId: number, seasonNumber: number, seasonId: number) {
    const seasonDetails = await this.tmdbService.getSeasonDetails(showTmdbId, seasonNumber);
    
    if (Array.isArray(seasonDetails.episodes)) {
      const episodeUpserts = seasonDetails.episodes.map((ep: any) => {
        return this.prisma.episode.upsert({
          where: { tmdbId: ep.id },
          update: {
            name: ep.name,
            overview: ep.overview,
            episodeNumber: ep.episode_number,
            airDate: ep.air_date ? new Date(ep.air_date) : null,
            stillPath: ep.still_path,
            runtime: ep.runtime,
            seasonId: seasonId,
          },
          create: {
            tmdbId: ep.id,
            name: ep.name,
            overview: ep.overview,
            episodeNumber: ep.episode_number,
            airDate: ep.air_date ? new Date(ep.air_date) : null,
            stillPath: ep.still_path,
            runtime: ep.runtime,
            seasonId: seasonId,
          },
        });
      });

      // Run episode upserts in parallel but wait for completion
      await Promise.all(episodeUpserts);
    }
  }

  // Retorna todas as séries
  async getAllShows() {
    return this.prisma.shows.findMany({
      include: { seasons: true },
    });
  }

  // Retorna uma série pelo TMDB ID
  async getShow(tmdbId: number) {
    return this.prisma.shows.findUnique({
      where: { tmdbId: tmdbId },
      include: {
        seasons: {
          include: {
            episodes: true
          }
        }
      },
    });
  }

  async getShowByIdShow(id_show: number) { 
    return this.prisma.shows.findUnique({
      where: { 
        id_show: id_show // 👈 O Prisma busca o show usando o ID primário
      },
      include: {
        seasons: {
          include: {
            episodes: true
          }
        }
      },
    });
  }
}
