import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';
import { Lecture } from '../entities/lecture.entity';
import { Question } from '../entities/question.entity';
import { User } from '../entities/user.entity';
import { PassportModule } from '../passport';
import RelationMapper from '../util/util.service';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Lecture, User]),
    ElasticsearchModule,
    PassportModule
  ],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    RelationMapper,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true
      })
    }
  ]
})
export class QuestionModule {}
