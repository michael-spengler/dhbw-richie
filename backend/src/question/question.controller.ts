import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Data } from '../entities/data.entity';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  public getQuestions(@Query('q') q: string) {
    return this.questionService.getQuestions(q);
  }

  @Get(':_id')
  public getQuestionById(@Param('_id') _id: string) {
    return this.questionService.getQuestionById(_id);
  }

  @Post()
  public createQuestion(@Body() question: Data) {
    return this.questionService.createQuestion(question);
  }

  @Put(':_id')
  public updateQuestion(@Param('_id') _id: string, @Body() question: Data) {
    return this.questionService.updateQuestion(_id, question);
  }

  @Delete(':_id')
  public deleteQuestion(@Param('_id') _id: string) {
    return this.questionService.deleteQuestion(_id);
  }
}
