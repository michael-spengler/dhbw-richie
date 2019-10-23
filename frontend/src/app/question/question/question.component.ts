import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationType } from 'src/app/models/notificationTyp.enum';
import { IQuestion } from 'src/app/models/question.model';
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
  public question: IQuestion = {} as IQuestion;

  get isValid(): boolean {
    return !!this.question.question;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.questionService.getQuestionById(params.id).subscribe(q => {
        this.question = q;
      });
    });
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
