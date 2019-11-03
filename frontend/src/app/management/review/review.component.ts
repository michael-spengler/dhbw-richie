import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/models/notificationTyp.enum';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/question/question.service';
import { NotificationService } from 'src/app/shared/notification.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss', '../../question/add/add.component.scss']
})
export class ReviewComponent implements OnInit {
  constructor(
    private notificationService: NotificationService,
    private questionService: QuestionService
  ) {}

  public lectures = [
    'Einführung IT',
    'Logik & Algebra',
    'Finanzmathe',
    'Programmieren I',
    'Programmieren II',
    'Bilanzierung',
    'Vertrags-Recht',
    'Was auch immer',
    'soll mir das',
    'Backend schicken'
  ];
  public currentQuestion: Question = {} as Question;
  public questions: Question[] = [];
  public overlayStyle: any = { display: 'none' };

  ngOnInit(): void {
    this.getUnansweredQuestions();
  }

  selectionChanged(selected): void {
    this.currentQuestion.lecture = selected;
  }

  public togglePopUp(question: Question): void {
    this.currentQuestion = question;
    this.overlayStyle = {
      display: this.overlayStyle.display == 'none' ? 'block' : 'none'
    };
  }

  closePopUp(): void {
    this.overlayStyle = { display: 'none' };
  }

  buttonKeydown(name, event): void {
    if (event.key === 'Enter') {
      if (name === 'del') this.deleteQuestion();
      if (name === 'add') this.acceptQuestion();
    }
  }

  acceptQuestion(): void {
    this.closePopUp();
    this.notificationService.sendNotification(
      'Frage wurde eingetragen',
      NotificationType.SUCCESS
    );
  }

  deleteQuestion(): void {
    this.closePopUp();
    this.notificationService.sendNotification(
      'Frage wurde gelöscht',
      NotificationType.ERROR
    );
  }

  async getUnansweredQuestions(): Promise<void> {
    this.questions = await this.questionService.getQuestionsInReviewState();
  }
}
