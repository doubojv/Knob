export class CreateEpisodeDto {
  tmdbId: number;
  name: string;
  overview?: string;
  episodeNumber: number;
  airDate?: Date;
  stillPath?: string;
  runtime?: number;
  seasonId: number;
}