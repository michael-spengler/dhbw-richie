import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationType } from 'src/app/models/notificationTyp.enum';
import { Question } from 'src/app/models/question.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    private notificationService: NotificationService,
    private httpClient: HttpClient,

    private questionService: QuestionService
  ) {
    route.params.subscribe(params => {
      this.question.id = params.id;
    });
  }
  public publicComment: any;
  public question: Question = {} as Question;

  get isValid(): boolean {
    return !!this.question.question;
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.question = await this.questionService.getQuestionById(params.id);
    });
  }

  public async likeOrDislikeQuestion(type: 'like' | 'dislike') {
    if (type === 'like') {
      this.question = await this.questionService.likeQuestion(this.question);
    } else {
      this.question = await this.questionService.dislikeQuestion(this.question);
    }
  }

  public cancel(): void {
    this.publicComment = '';
  }

  public submit(): void {
    this.notificationService.sendNotification(
      'Submit: ' + this.publicComment,
      NotificationType.SUCCESS
    );
  }
}
