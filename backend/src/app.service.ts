import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Data } from './entities/data.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Data) private readonly dataRepo: MongoRepository<Data>,
  ) {}
  getTest() {
    return this.dataRepo.find();
  }
}
