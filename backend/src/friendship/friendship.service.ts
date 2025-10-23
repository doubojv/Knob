import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';

@Injectable()
export class FriendshipService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFriendshipDto) {
    const existing = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          { id_user: dto.id_user, id_friend: dto.id_friend },
          { id_user: dto.id_friend, id_friend: dto.id_user },
        ],
      },
    });

    if (existing) {
      return { message: 'Friendship already exists or pending', existing };
    }

    return this.prisma.friendship.create({
      data: {
        id_user: dto.id_user,
        id_friend: dto.id_friend,
        status: 'pending',
      },
    });
  }

  async update(id: number, dto: UpdateFriendshipDto) {
    return this.prisma.friendship.update({
      where: { id },
      data: { status: dto.status },
    });
  }

  async acceptRequest(id: number) {
    return this.prisma.friendship.update({
      where: { id },
      data: { status: 'accepted' },
    });
  }

  async remove(id: number) {
    return this.prisma.friendship.delete({ where: { id } });
  }

  async findUserFriends(id_user: number) {
    return this.prisma.friendship.findMany({
      where: {
        OR: [
          { id_user, status: 'accepted' },
          { id_friend: id_user, status: 'accepted' },
        ],
      },
      include: {
        user: true,
        friend: true,
      },
    });
  }

  async findPendingRequests(id_user: number) {
    return this.prisma.friendship.findMany({
      where: { id_friend: id_user, status: 'pending' },
      include: { user: true },
    });
  }
}
