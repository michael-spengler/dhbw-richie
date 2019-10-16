import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Lecture } from 'src/entities/lecture.entity';
import { LectureService } from './lecture.service';

@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Get()
  public getLectures() {
    return this.lectureService.getLectures();
  }

  @Get(':_id')
  public getLectureById(@Param('_id') _id: string) {
    return this.lectureService.getLectureById(_id);
  }

  @Post()
  public createLecture(@Body() lecture: Lecture) {
    return this.lectureService.createLecture(lecture);
  }

  @Put(':_id')
  public updateLecture(@Param('_id') _id: string, @Body() lecture: Lecture) {
    return this.lectureService.updateLecture(_id, lecture);
  }

  @Delete(':_id')
  public deleteLecture(@Param('_id') _id: string) {
    return this.lectureService.deleteLecture(_id);
  }
}
