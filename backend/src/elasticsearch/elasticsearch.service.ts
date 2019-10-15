import { Injectable } from '@nestjs/common';
import { Data } from 'src/entities/data.entity';
import client from './client';

@Injectable()
export class ElasticsearchService {
  public async isQuestionIndex() {
    const { body } = await client.indices.exists({ index: 'question' });
    return body;
  }

  public createQuestionIndex() {
    // mappings hinzufügen -> priorities, no_analyze
    return client.indices.create({
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

    return client.bulk({ index: 'question', body });
  }

  public async searchQuestions(q: string) {
    // suche muss auch andere attribute umfassen
    const { body } = await client.search({
      index: 'question',
      body: {
        query: {
          match: {
            question: q
          }
        }
      }
    });

    return body.hits.hits.map(s => ({ id: s._id, ...s._source }));
  }

  public async createQuestion(question: Data) {
    await client.index({
      index: 'question',
      body: {
        ...question
      }
    });
  }

  public async updateQuestion(_id: string, question: Data) {
    await client.index({
      index: 'question',
      id: _id,
      body: {
        ...question
      }
    });
    await client.indices.refresh();
  }

  public async deleteQuestion(_id: string) {
    await client.delete({
      index: 'question',
      id: _id
    });
  }
}
