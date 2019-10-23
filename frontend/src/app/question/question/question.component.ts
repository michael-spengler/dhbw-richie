import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationType } from 'src/app/models/notificationTyp.enum';
import { IQuestion } from 'src/app/models/question.model';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements AfterViewInit {
  constructor(
    public route: ActivatedRoute,
    private notificationService: NotificationService,
    private httpClient: HttpClient,
    private ngZone: NgZone
  ) {
    route.params.subscribe(params => {
      this.question._id = params.id;
    });
  }

  public isValid: boolean;
  public publicComment: any;
  public question: IQuestion = {} as IQuestion;

  ngAfterViewInit(): void {
    this.loadQuestion();
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

  public loadQuestion(): void {
    this.httpClient // TODO: ADD GET
      .get(
        'https://raw.githubusercontent.com/TimoScheuermann/cdn/master/DHBW%20Richie/question.json'
      )
      .subscribe(
        data => {
          console.log(data);
          this.question = JSON.parse(JSON.stringify(data));
          this.isValid = true;
        },
        error => {
          console.log('Error => ', error);
          this.isValid = false;
        }
      );
  }
}
