import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticsearchService } from 'src/elasticsearch/elasticsearch.service';
import { Data } from 'src/entities/data.entity';
import { Lecture } from 'src/entities/lecture.entity';
import { User } from 'src/entities/user.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Data, Lecture, User])],
  controllers: [QuestionController],
  providers: [QuestionService, ElasticsearchService]
})
export class QuestionModule {}
