export interface CreateReviewDto {
  id_user: number;
  id_show?: number;     // opcional — pode ser review de série
  id_season?: number;   // opcional — ou de temporada
  content?: string;    // texto do review (comentário)
  rating?: number;     // nota opcional
  createdAt?: Date;    // pode ser setado automaticamente
}
