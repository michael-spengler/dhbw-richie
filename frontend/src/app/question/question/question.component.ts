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
    private questionService: QuestionService
  ) {}

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
    this.question = await this.questionService.likeOrDislikeQuestion(
      this.question.id,
      type
    );
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
