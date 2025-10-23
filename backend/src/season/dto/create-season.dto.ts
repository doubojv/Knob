export class CreateSeasonDto {
  tmdbId: number;
  name: string;
  overview?: string;
  seasonNumber: number;
  airDate?: Date;
  posterPath?: string;
  voteAverage?: number;
  numberOfEpisodes?: number;
  showId: number;
}