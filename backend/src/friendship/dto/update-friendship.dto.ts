import { CreateFriendshipDto } from './create-friendship.dto';

export interface UpdateFriendshipDto extends Partial<CreateFriendshipDto> {
    id: number;
    status?: string; // pending | accepted | refused
}
