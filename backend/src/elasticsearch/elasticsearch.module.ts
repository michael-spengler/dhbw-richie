import { Module } from '@nestjs/common';
import { ConfigModule } from '../config';
import { ClientService } from './client';
import { ElasticsearchService } from './elasticsearch.service';

@Module({
  imports: [ConfigModule],
  providers: [ElasticsearchService, ClientService],
  exports: [ElasticsearchService]
})
export class ElasticsearchModule {}
