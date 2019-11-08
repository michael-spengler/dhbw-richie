import { state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { NotificationType } from 'src/app/models';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'richie-comment',
  templateUrl: './richie-comment.component.html',
  styleUrls: ['./richie-comment.component.scss'],
  animations: [
    trigger('toggleTextarea', [
      state(
        'open',
        style({
          display: 'block'
        })
      ),
      state(
        'closed',
        style({
          display: 'none'
        })
      ),
      transition('open <=> closed', [])
    ])
  ]
})
export class RichieCommentComponent {
  @Input() id: number;
  @Input() comment: string;
  @Input() author: string;
  @Input() date: number;

  answer: string;
  textareaStyle: boolean = false;

  constructor(public notificationService: NotificationService) {}

  public toggleTextarea(): void {
    this.answer = '';
    this.textareaStyle = !this.textareaStyle;
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
    this.textareaStyle = false;
  }
}
