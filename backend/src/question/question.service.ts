import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { Lecture } from '../entities/lecture.entity';
import { Question } from '../entities/question.entity';
import { Cron } from '../scheduling';
import RelationMapper from '../util/util.service';

@Injectable()
export class QuestionService implements OnModuleInit {
  private readonly LOGGER = new Logger(QuestionService.name);

  constructor(
    @InjectRepository(Question) private readonly questionRepo: MongoRepository<Question>,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly relationMapper: RelationMapper
  ) {}

  async onModuleInit() {
    // copy data from database to elasticsearch
    this.LOGGER.debug('Setting up Elastic Search');
    const isIndex = await this.elasticsearchService.isQuestionIndex();
    if (!isIndex) {
      this.LOGGER.debug('Creating Question Index');
      await this.elasticsearchService.createQuestionIndex();
    }
    await this.syncQuestionsWithElastic();
    this.LOGGER.debug('Elastic Search initialized');
  }

  @Cron('*/5 * * * *')
  private async syncQuestionsWithElastic() {
    this.LOGGER.debug('Synchronizing Elastic Search with Database');
    const questions = await this.questionRepo.find();
    this.LOGGER.debug(`Indexing ${questions.length} questions`);
    await this.elasticsearchService.indexQuestions(questions);
  }

  public async getQuestions(q: string | null = null): Promise<Question[]> {
    if (q) {
      return this.elasticsearchService.searchQuestions(q);
    }
    const questions = await this.questionRepo.find();
    return questions;
  }

  public getQuestionById(_id: string) {
    return this.questionRepo.findOne(_id).then(Question.transform);
  }

  public async getInteractedQuestionForUser(userId: string) {
    const [liked, disliked] = await Promise.all([
      this.questionRepo.find({
        where: {
          likedBy: {
            $in: [userId]
          }
        }
      }),
      this.questionRepo.find({
        where: {
          dislikedBy: {
            $in: [userId]
          }
        }
      })
    ]);
    return {
      likedQuestions: Question.transform(liked) as Question[],
      dislikedQuestions: Question.transform(disliked) as Question[]
    };
  }

  public async getQuestionsInReview() {
    try {
      return this.questionRepo.find({
        where: {
          isReviewed: false
        }
      });
    } catch {
      throw new InternalServerErrorException('Cannot find Questions!');
    }
  }

  public async createQuestion(question: Question) {
    try {
      if (question.lecture) {
        this.LOGGER.debug('Matching lecture');
        question = await this.relationMapper.createRelation(question, 'lecture', Lecture);
      }
      return this.questionRepo.save(question).then(Question.transform);
    } catch {
      throw new BadRequestException('Creation Failed');
    }
  }

  public async updateQuestion(_id: string, question: Question) {
    try {
      if (question.lecture) {
        question = await this.relationMapper.createRelation(question, 'lecture', Lecture);
      }
      return this.questionRepo.save(question).then(Question.transform);
    } catch {
      throw new InternalServerErrorException('Update failed');
    }
  }

  public async likeOrDislikeQuestion(
    questionId: string,
    userId: string,
    operation: 'like' | 'dislike'
  ) {
    await this.questionRepo.updateOne(
      {
        _id: new ObjectId(questionId)
      },
      {
        $addToSet: {
          [`${operation}dBy`]: userId
        }
      }
    );
    const question = await this.questionRepo.findOne(questionId).then(Question.transform);
    return question;
  }

  public async deleteQuestion(_id: string) {
    try {
      await this.questionRepo.delete(_id);
      return { deleted: true };
    } catch {
      throw new InternalServerErrorException('Deletion failed');
    }
  }
}
