import { Component } from '@angular/core';
import { NotificationType } from 'src/app/models/notificationTyp.enum';
import { Question } from 'src/app/models/question.model';
import { constants } from 'src/app/shared/constants';
import { NotificationService } from 'src/app/shared/notification.service';
import { UserService } from 'src/app/shared/user.service';
import { QuestionService } from '../question.service';

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
    this.constants = constants;
  }

  public readonly constants: any;
  public question: Question = {
    question: '',
    answer: '',
    source: '',
    lecture: ''
  } as Question;

  selectionChanged(selection): void {
    this.question.lecture = selection;
  }

  onInputKeyDown(event): void {
    if (event.key === 'Enter') this.submitQuestion();
  }

  async submitQuestion(): Promise<void> {
    const totalLenght =
      this.question.answer.length +
      this.question.question.length +
      this.question.lecture.length +
      this.question.source.length;
    if (totalLenght > 0) {
      this.notificationService.sendNotification(
        'Deine Frage wurde eingereicht. Danke!',
        NotificationType.SUCCESS
      );

      const q = await this.questionService.addQuestion(this.question);

      this.question = this.question.reset();
    } else {
      this.notificationService.sendNotification(
        'Bitte fülle alle Felder aus!',
        NotificationType.ERROR
      );
    }
  }
}
