import { Module } from '@nestjs/common';
import { LectureController } from './lecture.controller';
import { Lecture } from 'src/entities/lecture.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureService } from './lecture.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lecture])],
  controllers: [LectureController],
  providers: [LectureService]
})
export class LectureModule {}
