import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IQuestion } from '../models/question.model';

const backend_url =
  'https://raw.githubusercontent.com/TimoScheuermann/cdn/master/DHBW%20Richie';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private readonly http: HttpClient) {}

  public getQuestionById(id: string = '') {
    return this.http
      .get<IQuestion>(`${backend_url}/question.json`)
      .pipe(map(d => JSON.parse(JSON.stringify(d)) as IQuestion));
  }

  public searchForKeyword(keyword: string = '') {
    return this.http
      .get<IQuestion[]>(`${backend_url}/foundQuestions.json`)
      .pipe(map(d => JSON.parse(JSON.stringify(d)) as IQuestion[]));
  }
}
