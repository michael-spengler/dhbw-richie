import { Component } from '@angular/core';
import { NotificationType } from 'src/app/models';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'richie-cookie',
  templateUrl: './richie-cookie.component.html',
  styleUrls: ['./richie-cookie.component.scss']
})
export class RichieCookieComponent {
  constructor(public readonly notificationService: NotificationService) {}

  public cookieStyle: any;

  public hide(): void {
    this.cookieStyle = { transform: 'translateZ(600px) translateY(300px)', opacity: 0 };
  }

  private sendNotification(): void {
    this.notificationService.sendNotification(
      'Einstellungen gespeichert!',
      NotificationType.INFORMATION
    );
  }

  public decline(): void {
    this.sendNotification();
    this.hide();
  }
  public accept(): void {
    this.sendNotification();
    this.hide();
  }
}
