import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Question } from '../models/question.model';
import { UserService } from '../shared/user.service';

const backend_url =
  'https://raw.githubusercontent.com/TimoScheuermann/cdn/master/DHBW%20Richie';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService
  ) {}

  public getQuestionById(id: string = '') {
    return this.http
      .get<Question>(`${environment.backend}/api/question/${id}`)
      .pipe(map(x => plainToClass(Question, x)))
      .toPromise();
  }

  public searchForKeyword(keyword: string = '') {
    return this.http
      .get<Question[]>(`${environment.backend}/api/question`, {
        params: {
          q: keyword
        }
      })
      .pipe(map(qs => qs.map(q => plainToClass(Question, q))));
  }

  public addQuestion(question: Question) {
    return this.http
      .post<Question>(`${environment.backend}/api/question`, question)
      .pipe(map(x => plainToClass(Question, x)))
      .toPromise();
  }

  public likeQuestion(question: Question) {
    return this.http
      .put<Question>(`${environment.backend}/api/question/${question.id}`, {
        ...question,
        likedBy: question.likedBy.push(this.userService.richieUser)
      })
      .toPromise();
  }

  public dislikeQuestion(question: Question) {
    return this.http
      .put<Question>(`${environment.backend}/api/question/${question.id}`, {
        ...question,
        dislikedBy: question.dislikedBy.push(this.userService.richieUser)
      })
      .toPromise();
  }
}
