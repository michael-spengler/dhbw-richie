import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Data } from '../entities/data.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: MongoRepository<User>,
    @InjectRepository(Data) private readonly dataRepo: MongoRepository<Data>
  ) {}

  public getUsers() {
    return this.userRepo.find();
  }

  public async getUserDetails(id: string) {
    const user = await this.userRepo.findOne(id);
    const lik = await this.dataRepo.find({
      likedBy: [user._id.toString()]
    });
    const dis = await this.dataRepo.find({
      dislikedBy: [user._id.toString()]
    });
    return { ...user, likedQuestions: lik, dislikedQuestions: dis };
  }
}
