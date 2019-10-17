import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticsearchModule } from 'src/elasticsearch/elasticsearch.module';
import { Data } from 'src/entities/data.entity';
import { Lecture } from 'src/entities/lecture.entity';
import { User } from '../entities/user.entity';
import RelationMapper from '../util/util.service';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Data, Lecture, User]), ElasticsearchModule],
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
