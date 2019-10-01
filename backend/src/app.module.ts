import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { PassportModule } from './passport';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [PassportModule, LoginModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
