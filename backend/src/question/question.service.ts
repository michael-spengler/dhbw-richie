import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ElasticsearchService } from 'src/elasticsearch/elasticsearch.service';
import { Data } from 'src/entities/data.entity';
import { Lecture } from 'src/entities/lecture.entity';
import { User } from 'src/entities/user.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class QuestionService {
  private readonly LOGGER = new Logger(QuestionService.name);

  constructor(
    @InjectRepository(Data) private readonly dataRepo: MongoRepository<Data>,
    @InjectRepository(Lecture) private readonly lectureRepo: MongoRepository<Lecture>,
    @InjectRepository(User) private readonly userRepo: MongoRepository<Lecture>,
    private readonly elasticsearchService: ElasticsearchService
  ) {
    this.LOGGER.debug('Setting up Elastic Search');
    this.elasticsearchService.isQuestionIndex().then(isIndex => {
      this.getQuestions().then(questions => {
        this.LOGGER.debug('Synchronizing Elastic Search with Database');
        if (!isIndex) {
          this.elasticsearchService.createQuestionIndex().then(() => {
            this.elasticsearchService.indexQuestions(questions).then(() => {
              this.LOGGER.debug('Elastic Search initialized');
            });
          });
        } else {
          this.elasticsearchService.indexQuestions(questions).then(() => {
            this.LOGGER.debug('Elastic Search initialized');
          });
        }
      });
    });
  }

  public getQuestions(q: string | null = null) {
    if (q) {
      return this.elasticsearchService.searchQuestions(q);
    }
    return this.dataRepo.find();
  }

  public getQuestionById(_id: string) {
    return this.dataRepo.findOne(_id);
  }

  public async createQuestion(question: Data) {
    try {
      await this.elasticsearchService.createQuestion(question);

      await this.createRelation(question, 'lecture', this.lectureRepo);
      await this.createRelation(question, 'creator', this.userRepo);
      return this.dataRepo.save(question);
    } catch {
      throw new HttpException('Creation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async updateQuestion(_id: string, question: Data) {
    try {
      await this.elasticsearchService.updateQuestion(_id, question);

      await this.createRelation(question, 'lecture', this.lectureRepo);
      await this.createRelation(question, 'creator', this.userRepo);
      await this.dataRepo.update(_id, question);
      return this.dataRepo.findOne(_id);
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

  private async createRelation(question: Data, relation: string, repo: any) {
    if (question[relation]) {
      if (typeof question[relation] === 'string' && question[relation].length === 24) {
        const object = await repo.findOne(question[relation]);
        if (!object) {
          throw new NotFoundException();
        }
        question[relation] = object;
      } else {
        throw new BadRequestException();
      }
    }
  }
}
