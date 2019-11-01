import {
  HttpException,
  HttpStatus,
  Injectable,
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
    @InjectRepository(Question) private readonly dataRepo: MongoRepository<Question>,
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
    const questions = await this.dataRepo.find();
    this.LOGGER.debug(`Indexing ${questions.length} questions`);
    await this.elasticsearchService.indexQuestions(questions);
  }

  public async getQuestions(q: string | null = null): Promise<Question[]> {
    if (q) {
      return this.elasticsearchService.searchQuestions(q);
    }
    const questions = await this.dataRepo.find();
    return questions;
  }

  public getQuestionById(_id: string) {
    return this.dataRepo.findOne(_id).then(Question.transform);
  }

  public async getInteractedQuestionForUser(userId: string) {
    const [liked, disliked] = await Promise.all([
      this.dataRepo.find({
        where: {
          likedBy: {
            $in: [userId]
          }
        }
      }),
      this.dataRepo.find({
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

  public async createQuestion(question: Question) {
    try {
      if (question.lecture) {
        this.LOGGER.debug('Matching lecture');
        question = await this.relationMapper.createRelation(question, 'lecture', Lecture);
      }
      return this.dataRepo.save(question).then(async q => {
        // await this.elasticsearchService.createQuestion(q);
        return Question.transform(q);
      });
    } catch (err) {
      console.log(err);
      throw new HttpException('Creation failed', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  public async updateQuestion(_id: string, question: Question) {
    try {
      if (question.lecture) {
        question = await this.relationMapper.createRelation(question, 'lecture', Lecture);
      }
      await this.dataRepo.update(_id, question);
      // await this.elasticsearchService.updateQuestion(_id, question);
      return this.dataRepo.findOne(_id).then(Question.transform);
    } catch {
      throw new HttpException('Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async likeOrDislikeQuestion(
    questionId: string,
    userId: string,
    operation: 'like' | 'dislike'
  ) {
    await this.dataRepo.updateOne(
      {
        _id: new ObjectId(questionId)
      },
      {
        $addToSet: {
          [`${operation}dBy`]: userId
        }
      }
    );
    const question = await this.dataRepo.findOne(questionId).then(Question.transform);
    // this.elasticsearchService.updateQuestion(questionId, question as Data);
    return question;
  }

  public async deleteQuestion(_id: string) {
    try {
      // await this.elasticsearchService.deleteQuestion(_id);

      await this.dataRepo.delete(_id);
      return { deleted: true };
    } catch {
      throw new HttpException('Deletion failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
