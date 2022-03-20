import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [CatsModule, AuthModule, UsersModule, CaslModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
