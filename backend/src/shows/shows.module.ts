// shows.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { ShowsService } from './shows.service';
import { TmdbModule } from '../tmdb/tmdb.module';
import { ShowsController } from './shows.controller';

@Module({
  imports: [TmdbModule],
  providers: [ShowsService, PrismaService],
  exports: [ShowsService],
  controllers: [ShowsController],
})
export class ShowsModule {}
