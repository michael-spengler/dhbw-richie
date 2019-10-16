import { Module } from '@nestjs/common';

import { ConfigModule } from '../config';
import { PassportModule } from '../passport';
import { LoginController } from './controllers/login.controller';

@Module({
  imports: [ConfigModule, PassportModule],
  controllers: [LoginController],
})
export class LoginModule {}
