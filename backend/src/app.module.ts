import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DbModule } from './db/db.module';
import { ShowsModule } from './shows/shows.module';
import { TmdbModule } from './tmdb/tmdb.module';
import { WatchlistModule } from './watchlist/watchlist.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ReviewModule } from './review/review.module';
import { RatingModule } from './rating/rating.module';
import { LogModule } from './log/log.module';
import { FriendshipModule } from './friendship/friendship.module';

@Module({
  imports: [
    DbModule,
    UserModule,
    ShowsModule,
    TmdbModule,
    WatchlistModule,
    FavoriteModule,
    ReviewModule,
    RatingModule,
    LogModule,
    FriendshipModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
