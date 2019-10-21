import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/models/notificationTyp.enum';
import { NotificationService } from 'src/app/shared/notification.service';
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
    public router: Router
  ) {
    for (let i = 0; i < 9; i++) {
      this.dislikedQuestions.push({
        id: 12939839798,
        question: 'Was ist 1 + 1',
        answer:
          'Das ist ganz einfach 1 + 1 = 2. Warum das so ist kann ich aber leider nicht beweisen'
      });
      this.likedQuestions.push({
        id: 12939839798,
        question: 'Was ist 1 + 2',
        answer:
          'Das ist ganz einfach 1 + 2 = 3. Warum das so ist kann ich aber leider nicht beweisen'
      });
    }
    for (let i = 0; i < 2; i++) {
      this.questionWrapper.push({ 'max-height': '0px', 'transition': '1s ease' });
      this.iconStyle.push({
        'margin-left': '10px',
        'transform': `rotate(0deg)`,
        'transition': '.5s ease'
      });
    }
  }

  dislikedQuestions = [];
  likedQuestions = [];
  questionWrapper = [];
  iconStyle = [];

  ngOnInit(): void {
    if (!localStorage.getItem('richie-user')) {
      this.router.navigate(['/login']);
    }
  }

  toggleQuestionWrapper(pos) {
    if (this.questionWrapper[pos]['max-height'] === '0px') {
      this.questionWrapper[pos]['max-height'] = '600px';
      this.iconStyle[pos].transform = 'rotate(90deg)';
    } else {
      this.questionWrapper[pos]['max-height'] = '0px';
      this.iconStyle[pos].transform = 'rotate(0deg)';
    }
  }

  removeLikedQuestion(index, event) {
    event.stopPropagation();
    this.likedQuestions.splice(index, 1);
    this.sendRemoveNotification();
  }

  removeDislikedQuestion(index, event) {
    event.stopPropagation();
    this.dislikedQuestions.splice(index, 1);
    this.sendRemoveNotification();
  }

  sendRemoveNotification() {
    this.notificationService.sendNotification(
      'Eintrag gelöscht',
      NotificationType.SUCCESS
    );
  }
}
