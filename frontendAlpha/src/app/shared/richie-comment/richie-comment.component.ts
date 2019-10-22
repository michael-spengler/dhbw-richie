import { Component, Input } from '@angular/core';
import { NotificationType } from 'src/app/models';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'richie-comment',
  templateUrl: './richie-comment.component.html',
  styleUrls: ['./richie-comment.component.scss']
})
export class RichieCommentComponent {
  constructor(public notificationService: NotificationService) {
    this.cancel();
  }

  @Input() id: number;
  @Input() comment: string;
  @Input() author: string;
  @Input() date: number;

  answer: string;
  textareaStyle: any;

  public toggleTextarea(): void {
    this.answer = '';
    this.textareaStyle = {
      display: this.textareaStyle.display === 'block' ? 'none' : 'block'
    };
  }

  public deleteComment(): void {
    this.comment = '$_DEL';
    this.notificationService.sendNotification(
      `Kommentar #${this.id} gelöscht`,
      NotificationType.INFORMATION
    );
  }

  public submit(): void {
    this.notificationService.sendNotification(
      `Antwort "${this.answer}" auf #${this.id} gespeichert`,
      NotificationType.SUCCESS
    );
    this.cancel();
  }

  public cancel(): void {
    this.textareaStyle = { display: 'none' };
  }
}
