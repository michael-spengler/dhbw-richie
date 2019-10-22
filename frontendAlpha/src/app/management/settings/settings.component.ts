import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/models/notificationTyp.enum';
import { IQuestion } from 'src/app/models/question.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { SharedFunctions } from 'src/app/shared/sharedFunctions.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(
    public notificationService: NotificationService,
    public userService: UserService,
    public router: Router,
    public sharedFunctions: SharedFunctions,
    public httpClient: HttpClient
  ) {}

  dislikedQuestions: IQuestion[] = [];
  likedQuestions: IQuestion[] = [];

  ngOnInit(): void {
    if (!this.userService.richieUser.signedIn) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadDislikedQuestion();
    this.loadLikedQuestion();
  }

  removeQuestion(question: IQuestion, wasLike: boolean): void {
    event.stopPropagation();

    this.dislikedQuestions = this.dislikedQuestions.filter(x => x._id !== question._id);
    this.likedQuestions = this.likedQuestions.filter(x => x._id !== question._id);

    this.notificationService.sendNotification(
      'Eintrag gelöscht',
      NotificationType.SUCCESS
    );
  }

  loadLikedQuestion(): void {
    // TODO: ADD GET
    this.httpClient
      .get(
        'https://raw.githubusercontent.com/TimoScheuermann/cdn/master/DHBW%20Richie/likedQuestions.json'
      )
      .subscribe(
        data => {
          JSON.parse(JSON.stringify(data)).forEach(question => {
            this.likedQuestions.push(question as IQuestion);
          });
        },
        error => {
          console.log('Error => ', error);
        }
      );
  }

  loadDislikedQuestion(): void {
    // TODO: ADD GET
    this.httpClient
      .get(
        'https://raw.githubusercontent.com/TimoScheuermann/cdn/master/DHBW%20Richie/dislikedQuestions.json'
      )
      .subscribe(
        data => {
          JSON.parse(JSON.stringify(data)).forEach(question => {
            this.dislikedQuestions.push(question as IQuestion);
          });
        },
        error => {
          console.log('Error => ', error);
        }
      );
  }
}
