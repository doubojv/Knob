import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: createUserDto,
  });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: { id_user: id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id_user: id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({
      where: { id_user: id },
    });
  }

  // Very simple login check: looks up user by nome and compares plain-text password.
  // NOTE: For production use, store hashed passwords and use proper auth mechanisms.
  async login(nome: string, senha: string) {
    const user = await this.prismaService.user.findUnique({ where: { nome } });
    if (!user) return { error: 'User not found' };
    if (user.senha !== senha) return { error: 'Invalid credentials' };
    // remove password before returning
    // @ts-ignore
    delete user.senha;
    return { user };
  }
}
