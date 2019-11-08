import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NotificationType } from '../models';
import { Question } from '../models/question.model';
import { NotificationService } from '../shared/notification.service';

const transformToQuestion = () => map(x => plainToClass(Question, x));

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(
    private readonly http: HttpClient,
    private readonly notificationService: NotificationService
  ) {}

  public getQuestionById(id: string = ''): Promise<Question> {
    return this.http
      .get<Question>(`${environment.backend}/api/question/${id}`)
      .pipe(transformToQuestion())
      .toPromise();
  }

  public searchForKeyword(keyword: string = ''): Observable<Question[]> {
    return this.http
      .get<Question[]>(`${environment.backend}/api/question`, {
        params: {
          q: keyword
        }
      })
      .pipe(map(x => plainToClass(Question, x)));
  }

  public addQuestion(question: Question) {
    return this.http
      .post<Question>(`${environment.backend}/api/question`, question)
      .pipe(transformToQuestion())
      .toPromise();
  }

  public getReactedQuestions() {
    return this.http
      .get<{ likedQuestions: Question[]; dislikedQuestions: Question[] }>(
        `${environment.backend}/api/question/reacted`
      )
      .pipe(
        catchError(() => {
          this.notificationService.sendNotification(
            'Fehler beim Laden',
            NotificationType.ERROR
          );
          return of<{ likedQuestions: Question[]; dislikedQuestions: Question[] }>({
            likedQuestions: [],
            dislikedQuestions: []
          });
        }),
        map(x => ({
          likedQuestions: plainToClass(Question, x.likedQuestions),
          dislikedQuestions: plainToClass(Question, x.dislikedQuestions)
        }))
      )
      .toPromise();
  }

  public getQuestionsInReviewState() {
    return this.http
      .get<Question[]>(`${environment.backend}/api/question/review`)
      .pipe(transformToQuestion())
      .toPromise();
  }

  public likeOrDislikeQuestion(questionId: string, type: 'like' | 'dislike') {
    return this.http
      .get<Question>(`${environment.backend}/api/question/${questionId}/${type}`)
      .pipe(transformToQuestion())
      .toPromise();
  }
}
