export interface CreateLogDto {
  id_user: number;
  id_show?: number;
  id_season?: number;
  id_review?: number;
  id_rating?: number;
  watchedAt?: Date;
  rewatch?: boolean;
}
