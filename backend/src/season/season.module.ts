import { Module } from '@nestjs/common';
import { SeasonService } from './season.service';
import { SeasonController } from './season.controller';
import { PrismaService } from '../db/prisma.service';

@Module({
  controllers: [SeasonController],
  providers: [SeasonService, PrismaService],
  exports: [SeasonService],
})
export class SeasonModule {}