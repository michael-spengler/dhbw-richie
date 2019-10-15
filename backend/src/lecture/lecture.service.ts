import { Injectable } from '@nestjs/common';
import { Lecture } from 'src/entities/lecture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture) private readonly lectureRepo: MongoRepository<Lecture>
  ) {}

  public getLectures() {
    return this.lectureRepo.find();
  }
}
