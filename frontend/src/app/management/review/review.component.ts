import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/models/notificationTyp.enum';
import { Question } from 'src/app/models/question.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { UserService } from 'src/app/shared/user.service';
import { constants } from '../../shared/constants';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss', '../../question/add/add.component.scss']
})
export class ReviewComponent implements OnInit {
  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    private httpClient: HttpClient
  ) {
    this.constants = constants;
  }

  public constants;
  public currentQuestion: Question = {} as Question;
  public questions: Question[] = [];
  public overlayStyle: any = { display: 'none' };

  ngOnInit(): void {
    if (
      !(this.userService.richieUser.isAdmin || this.userService.richieUser.isReviewer)
    ) {
      this.router.navigate(['/404']);
    }
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

  getUnansweredQuestions(): void {
    // TODO: ADD GET
    this.httpClient
      .get(
        'https://raw.githubusercontent.com/TimoScheuermann/cdn/master/DHBW%20Richie/unansweredQuestions.json'
      )
      .subscribe(
        data => {
          JSON.parse(JSON.stringify(data)).forEach(question => {
            this.questions.push(question as Question);
          });
        },
        error => {
          console.log('Error => ', error);
        }
      );
  }
}
