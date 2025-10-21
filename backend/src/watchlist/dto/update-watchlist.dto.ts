import { CreateWatchlistDto } from './create-watchlist.dto';

export interface UpdateWatchlistDto extends Partial<CreateWatchlistDto> {
    id: number;
}
