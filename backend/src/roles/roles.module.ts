import { Module } from '@nestjs/common';
import { RolesController } from './controllers/roles.controller';

@Module({
  controllers: [RolesController]
})
export class RolesModule {}
