import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecture } from 'src/entities/lecture.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture) private readonly lectureRepo: MongoRepository<Lecture>
  ) {}

  public getLectures() {
    return this.lectureRepo.find();
  }

  public getLectureById(_id: string) {
    return this.lectureRepo.findOne(_id);
  }

  public async createLecture(lecture: Lecture) {
    try {
      return await this.lectureRepo.save(lecture);
    } catch {
      throw new HttpException('Creation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async updateLecture(_id: string, lecture: Lecture) {
    try {
      await this.lectureRepo.update(_id, lecture);
      return this.lectureRepo.findOne(_id);
    } catch {
      throw new HttpException('Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteLecture(_id: string) {
    try {
      await this.lectureRepo.delete(_id);
      return { deleted: true };
    } catch {
      throw new HttpException('Deletion failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
