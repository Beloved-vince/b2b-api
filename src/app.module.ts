import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy';
import { ResourcesModule } from './resources/resources.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [ResourcesModule, UsersModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, FirebaseAuthStrategy],
})
export class AppModule {}