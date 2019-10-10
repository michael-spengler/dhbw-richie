import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Globals, NotificationType } from '../globals';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  constructor(public globals: Globals, public router: Router) {
    if (!globals.user['signed_in']) {
      router.navigate(['/login']);
      return;
    }
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
    this.globals.sendNotification('Eintrag gelöscht', NotificationType.SUCCESS);
  }
}
