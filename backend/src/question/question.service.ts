import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  OnModuleInit
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { Data } from '../entities/data.entity';
import { Lecture } from '../entities/lecture.entity';
import { User } from '../entities/user.entity';
import RelationMapper from '../util/util.service';

@Injectable()
export class QuestionService implements OnModuleInit {
  private readonly LOGGER = new Logger(QuestionService.name);

  constructor(
    @InjectRepository(Data) private readonly dataRepo: MongoRepository<Data>,
    @InjectRepository(Lecture) private readonly lectureRepo: MongoRepository<Lecture>,
    @InjectRepository(User) private readonly userRepo: MongoRepository<Lecture>,
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
    this.LOGGER.debug('Synchronizing Elastic Search with Database');
    const questions = await this.dataRepo.find();
    await this.elasticsearchService.indexQuestions(questions);
    this.LOGGER.debug('Elastic Search initialized');
  }

  public async getQuestions(q: string | null = null): Promise<Data[]> {
    // search with elasticsearch if query parameter is available
    if (q) {
      return this.elasticsearchService.searchQuestions(q);
    }
    const questions = await this.dataRepo.find();
    return questions;
  }

  public getQuestionById(_id: string) {
    return this.dataRepo.findOne(_id).then(Data.transform);
  }

  public async createQuestion(question: Data) {
    try {
      if (question.lecture) {
        this.LOGGER.debug('Matching lecture');
        question = await this.relationMapper.createRelation(question, 'lecture', Lecture);
      }
      return this.dataRepo.save(question).then(async q => {
        await this.elasticsearchService.createQuestion(q);
        return Data.transform(q);
      });
    } catch (err) {
      console.log(err);
      throw new HttpException('Creation failed', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  public async updateQuestion(_id: string, question: Data) {
    try {
      if (question.lecture) {
        question = await this.relationMapper.createRelation(question, 'lecture', Lecture);
      }
      await this.dataRepo.update(_id, question);
      await this.elasticsearchService.updateQuestion(_id, question);
      return this.dataRepo.findOne(_id).then(Data.transform);
    } catch {
      throw new HttpException('Update failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteQuestion(_id: string) {
    try {
      await this.elasticsearchService.deleteQuestion(_id);

      await this.dataRepo.delete(_id);
      return { deleted: true };
    } catch {
      throw new HttpException('Deletion failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
