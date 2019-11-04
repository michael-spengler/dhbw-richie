import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from '../../models/notificationTyp.enum';
import { Question } from '../../models/question.model';
import { QuestionService } from '../../question/question.service';
import { NotificationService } from '../../shared/notification.service';
import { SharedFunctions } from '../../shared/sharedFunctions.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(
    public notificationService: NotificationService,
    public userService: UserService,
    public questionService: QuestionService,
    public router: Router,
    public sharedFunctions: SharedFunctions
  ) {}

  dislikedQuestions: Question[] = [];
  likedQuestions: Question[] = [];

  ngOnInit() {
    this.loadQuestions();
  }

  removeQuestion(question: Question, wasLike: boolean): void {
    this[`${wasLike ? '' : 'dis'}likedQuestions`] = this[
      `${wasLike ? '' : 'dis'}likedQuestions`
    ].filter((x: Question) => x.id !== question.id);
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
    const {
      likedQuestions,
      dislikedQuestions
    } = await this.questionService.getReactedQuestions();
    this.likedQuestions = likedQuestions;
    this.dislikedQuestions = dislikedQuestions;
  }
}
