import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';
import { Lecture } from '../entities/lecture.entity';
import { Question } from '../entities/question.entity';
import { User } from '../entities/user.entity';
import { PassportModule } from '../passport';
import RelationMapper from '../util/util.service';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TelegramService } from './telegram.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Lecture, User]),
    ElasticsearchModule,
    PassportModule
  ],
  controllers: [QuestionController],
  providers: [QuestionService, RelationMapper, TelegramService, ConfigService],
  exports: [QuestionService, RelationMapper]
})
export class QuestionModule {}
