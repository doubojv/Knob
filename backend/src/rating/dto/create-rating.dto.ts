export interface CreateRatingDto {
  id_user: number;
  id_show?: number;
  id_season?: number;
  rating: number;
}
