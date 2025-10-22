export interface CreateReviewDto {
  id_user: number;
  id_show?: number;     // opcional — pode ser review de série
  id_season?: number;   // opcional — ou de temporada
  id_rating?: number;  // opcional — id da avaliação associada
  content?: string;    // texto do review (comentário)
  createdAt?: Date;    // pode ser setado automaticamente
}
