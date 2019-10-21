import { Component } from '@angular/core';
import { NotificationType } from 'src/app/models/notificationTyp.enum';
import { NotificationService } from 'src/app/shared/notification.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  constructor(
    public notificationService: NotificationService,
    public userService: UserService
  ) {}

  formData = ['', '', '', ''];
  lectures = [
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

  selectionChanged(selection) {
    this.formData[3] = selection;
  }

  onInputKeyDown(event) {
    if (event.key === 'Enter') this.submitQuestion();
  }

  submitQuestion() {
    if (this.formData.filter(x => x.length < 1).length == 0) {
      this.notificationService.sendNotification(
        'Deine Frage wurde eingereicht. Danke!',
        NotificationType.SUCCESS
      );

      this.formData = this.formData.map(() => '');
    } else {
      this.notificationService.sendNotification(
        'Bitte fülle alle Felder aus!',
        NotificationType.ERROR
      );
    }
  }
}
