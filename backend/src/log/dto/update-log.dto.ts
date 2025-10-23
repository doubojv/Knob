import { CreateLogDto } from './create-log.dto';

export interface UpdateLogDto extends Partial<CreateLogDto> {
    id: number;
}
