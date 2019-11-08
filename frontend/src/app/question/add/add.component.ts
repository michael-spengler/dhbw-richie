import { Component } from '@angular/core';
import { NotificationType } from 'src/app/models/notificationTyp.enum';
import { Question } from 'src/app/models/question.model';
import { constants } from 'src/app/shared/constants';
import { NotificationService } from 'src/app/shared/notification.service';
import { UserService } from 'src/app/shared/user.service';
import { QuestionService } from '../question.service';

const { lectures } = constants;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  constructor(
    public notificationService: NotificationService,
    public userService: UserService,
    private readonly questionService: QuestionService
  ) {
    this.lectures = lectures;
  }

  public readonly lectures: string[];
  public question: Question = new Question();

  selectionChanged(selection: string): void {
    this.question.lecture = selection;
  }

  onInputKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.submitQuestion();
  }

  async submitQuestion(): Promise<void> {
    if (this.question.isValid()) {
      try {
        await this.questionService.addQuestion(this.question);
        this.notificationService.sendNotification(
          'Deine Frage wurde eingereicht. Danke!',
          NotificationType.SUCCESS
        );
        this.question = this.question.reset();
      } catch {
        this.notificationService.sendNotification(
          'Upps, da ist was schiefgelaufen!',
          NotificationType.ERROR
        );
      }
      return;
    }
    this.notificationService.sendNotification(
      'Bitte fülle alle Felder aus!',
      NotificationType.ERROR
    );
  }
}
