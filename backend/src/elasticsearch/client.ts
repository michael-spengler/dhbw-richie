import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/services/config.service';

@Injectable()
export class ClientService {
  private readonly client: Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      node: configService.get('ELASTIC_URL')
    });
  }

  public getClient() {
    return this.client;
  }
}
