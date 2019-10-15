import { Controller, Get } from '@nestjs/common';
import { LectureService } from './lecture.service';

@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Get()
  public getLectures() {
    return this.lectureService.getLectures();
  }
}
