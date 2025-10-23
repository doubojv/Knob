import { Module } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { EpisodeController } from './episode.controller';
import { PrismaService } from '../db/prisma.service';

@Module({
  controllers: [EpisodeController],
  providers: [EpisodeService, PrismaService],
  exports: [EpisodeService],
})
export class EpisodeModule {}