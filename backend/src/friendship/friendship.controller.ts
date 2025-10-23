import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import type { CreateFriendshipDto } from './dto/create-friendship.dto';
import type { UpdateFriendshipDto } from './dto/update-friendship.dto';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post()
  async create(@Body() dto: CreateFriendshipDto) {
    return this.friendshipService.create(dto);
  }

  @Patch(':id/accept')
  async accept(@Param('id') id: string) {
    return this.friendshipService.acceptRequest(Number(id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateFriendshipDto) {
    return this.friendshipService.update(Number(id), dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.friendshipService.remove(Number(id));
  }

  @Get('user/:id')
  async findUserFriends(@Param('id') id: string) {
    return this.friendshipService.findUserFriends(Number(id));
  }

  @Get('pending/:id')
  async findPending(@Param('id') id: string) {
    return this.friendshipService.findPendingRequests(Number(id));
  }
}
