import { state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/models';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'richie-cookie',
  templateUrl: './richie-cookie.component.html',
  styleUrls: ['./richie-cookie.component.scss'],
  animations: [
    trigger('hideCookie', [
      state('open', style({})),
      state(
        'closed',
        style({ transform: 'translateZ(600px) translateY(300px)', opacity: 0 })
      ),
      transition('open => closed', [])
    ])
  ]
})
export class RichieCookieComponent implements OnInit {
  constructor(public readonly notificationService: NotificationService) {}

  public cookieStyle: boolean = true;

  ngOnInit() {
    if ((JSON.parse(localStorage.getItem('richie-cookie-banner')) || {}).accepted) {
      this.cookieStyle = false;
    }
  }

  public hide(): void {
    this.cookieStyle = false;
  }

  private sendNotification(): void {
    this.notificationService.sendNotification(
      'Einstellungen gespeichert!',
      NotificationType.INFORMATION
    );
  }

  private saveRespone(accepted: boolean) {
    localStorage.setItem(
      'richie-cookie-banner',
      JSON.stringify({
        accepted
      })
    );
  }

  public decline(): void {
    this.saveRespone(false);
    // Handle Opt-Out
    this.sendNotification();
    this.hide();
  }
  public accept(): void {
    this.saveRespone(true);
    this.sendNotification();
    this.hide();
  }
}
