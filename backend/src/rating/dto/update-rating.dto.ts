import { CreateRatingDto } from './create-rating.dto';

export interface UpdateRatingDto extends Partial<CreateRatingDto> {
    id: number;
}
