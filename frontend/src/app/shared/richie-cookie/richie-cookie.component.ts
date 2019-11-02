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

  public decline(): void {
    this.notificationService.sendNotification(
      'Wir haben deine Einstellungen gespeichert!',
      NotificationType.INFORMATION
    );
    this.hide();
  }
  public accept(): void {
    this.notificationService.sendNotification(
      'Wir haben deine Einstellungen gespeichert!',
      NotificationType.INFORMATION
    );
    this.hide();
  }
}
