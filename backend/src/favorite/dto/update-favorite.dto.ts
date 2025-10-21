import { CreateFavoriteDto } from './create-favorite.dto';

export interface UpdateFavoriteDto extends Partial<CreateFavoriteDto> {
    id: number;
}
