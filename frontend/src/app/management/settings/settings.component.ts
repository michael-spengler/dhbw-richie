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

  ngOnInit(): void {
    if (!this.userService.richieUser.signedIn) {
      this.router.navigate(['/login']);
      return;
    }
  }

  removeQuestion(question: IQuestion, wasLike: boolean): void {
    event.stopPropagation();

    this.userService.richieUser.dislikedQuestions = this.userService.richieUser.dislikedQuestions.filter(
      x => x._id !== question._id
    );
    this.userService.richieUser.likedQuestions = this.userService.richieUser.likedQuestions.filter(
      x => x._id !== question._id
    );

    this.notificationService.sendNotification(
      'Eintrag gelöscht',
      NotificationType.SUCCESS
    );
  }
}
