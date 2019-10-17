import { Component, Input } from '@angular/core';
import { NotificationType } from 'src/app/models';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'richie-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  constructor(public notificationService: NotificationService) {}

  @Input() id: number;
  @Input() comment: string;
  @Input() author: string;
  @Input() date: number;

  textAreaContent = '';
  textAreaStyle = {
    'max-height': '0px'
  };

  public submit() {
    this.notificationService.sendNotification(
      'Deine Antwort wurde gespeichert!',
      NotificationType.SUCCESS
    );
    const message = this.textAreaContent;
    this.cancel();
  }

  public cancel() {
    this.textAreaStyle = {
      'max-height': '0px'
    };
    this.textAreaContent = '';
  }
}
