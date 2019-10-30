import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { Data } from '../entities/data.entity';
import { ClientService } from './client';

@Injectable()
export class ElasticsearchService {
  private readonly client: Client;

  constructor(private readonly clientService: ClientService) {
    this.client = this.clientService.getClient();
  }

  public async isQuestionIndex() {
    const { body } = await this.client.indices.exists({ index: 'question' });
    return body;
  }

  public createQuestionIndex() {
    return this.client.indices.create({
      index: 'question'
    });
  }

  public indexQuestions(questions: Data[]) {
    const body = questions.reduce((a, b) => {
      a.push({ index: { _index: 'question', _id: b._id } });
      delete b._id;
      a.push({ ...b });
      return a;
    }, []);

    return this.clientService.getClient().bulk({ index: 'question', body });
  }

  public async searchQuestions(q: string) {
    const { body } = await this.client.search({
      index: 'question',
      body: {
        query: {
          bool: {
            should: [
              {
                match: {
                  question: {
                    query: q,
                    boost: 3
                  }
                }
              },
              {
                match: {
                  answer: {
                    query: q,
                    boost: 2
                  }
                }
              }
            ]
          }
        }
      }
    });

    return body.hits.hits.map(s => ({ id: s._id, ...s._source }));
  }

  public async createQuestion(question: Data) {
    delete question._id;
    await this.client.index({
      index: 'question',
      body: question
    });
  }

  public async updateQuestion(_id: string, question: Data) {
    await this.client.index({
      index: 'question',
      id: _id,
      refresh: 'true',
      body: {
        ...question
      }
    });
  }

  public async deleteQuestion(_id: string) {
    await this.client.delete({
      index: 'question',
      id: _id
    });
  }
}
