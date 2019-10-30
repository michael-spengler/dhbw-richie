import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/models/notificationTyp.enum';
import { Question } from 'src/app/models/question.model';
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
    public sharedFunctions: SharedFunctions
  ) {}

  dislikedQuestions: Question[] = [];
  likedQuestions: Question[] = [];

  ngOnInit() {
    this.loadQuestions();
  }

  removeQuestion(question: Question, wasLike: boolean): void {
    event.stopPropagation();

    this.dislikedQuestions = this.dislikedQuestions.filter(x => x.id !== question.id);
    this.likedQuestions = this.likedQuestions.filter(x => x.id !== question.id);
    // TODO: ADD HTTP CALL
    this.notificationService.sendNotification(
      'Eintrag gelöscht',
      NotificationType.SUCCESS
    );
  }

  logOut() {
    this.userService.logOut();
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  async loadQuestions(): Promise<void> {
    // TODO: ADD GET
    const {
      likedQuestions,
      dislikedQuestions
    } = await this.userService.getQuestionsForUser();
    this.likedQuestions = likedQuestions;
    this.dislikedQuestions = dislikedQuestions;
  }
}
