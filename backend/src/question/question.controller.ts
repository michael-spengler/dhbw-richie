import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Question } from '../entities/question.entity';
import { User } from '../entities/user.entity';
import { AuthenticatedUser } from '../passport';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  private readonly LOGGER = new Logger(QuestionController.name);

  constructor(private readonly questionService: QuestionService) {}

  @Get()
  public getQuestions(@Query('q') q: string) {
    return this.questionService.getQuestions(q);
  }

  @Get('reacted')
  @UseGuards(AuthGuard('jwt'))
  public getInteractedQuestionForUser(@AuthenticatedUser() user: User) {
    return this.questionService.getInteractedQuestionForUser(user._id.toString());
  }

  @Get('review')
  @UseGuards(AuthGuard('jwt'))
  public getQuestionsInReviewState() {
    return this.questionService.getQuestionsInReview();
  }

  @Get(':_id')
  public getQuestionById(@Param('_id') _id: string) {
    return this.questionService.getQuestionById(_id);
  }

  @Get(':id/like')
  @UseGuards(AuthGuard('jwt'))
  public likeQuestion(@AuthenticatedUser() user: User, @Param('id') id: string) {
    return this.questionService.likeOrDislikeQuestion(id, user._id.toString(), 'like');
  }

  @Get(':id/dislike')
  @UseGuards(AuthGuard('jwt'))
  public dislikeQuestion(@AuthenticatedUser() user: User, @Param('id') id: string) {
    return this.questionService.likeOrDislikeQuestion(id, user._id.toString(), 'dislike');
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  public createQuestion(@Body() question: Question, @AuthenticatedUser() user: User) {
    question.creator = user._id;
    return this.questionService.createQuestion(question);
  }

  @Put(':_id')
  public updateQuestion(@Param('_id') _id: string, @Body() question: Question) {
    return this.questionService.updateQuestion(_id, question);
  }

  @Delete(':_id')
  public deleteQuestion(@Param('_id') _id: string) {
    return this.questionService.deleteQuestion(_id);
  }
}
