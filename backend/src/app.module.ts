import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { ShowsModule } from './shows/shows.module';
import { TmdbModule } from './tmdb/tmdb.module';

@Module({
  imports: [DbModule,UserModule,ShowsModule, TmdbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
