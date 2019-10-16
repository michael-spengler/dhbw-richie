import { Component, OnDestroy, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { INotification, NotificationService } from '../notification.service';

@Component({
  selector: 'richie-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
  /*   animations: [
    trigger('toggleNotification', [
      state(
        'open',
        style({
          display: 'block',
          animation:
            'notification-animation 5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'
        })
      ),
      state(
        'closed',
        style({
          display: 'none',
          animation: 'none'
        })
      ),
      transition('open => closed', []),
      transition('closed => open', [])
    ])
  ] */
})
export class NotificationComponent implements OnInit, OnDestroy {
  currentNotification: INotification = {} as INotification;
  style = {
    display: 'none',
    animation: 'none'
  };

  constructor(public readonly notificationService: NotificationService) {}

  // TODO: Matthias Fragen
  ngOnInit(): void {
    this.notificationService.currentNotification.subscribe(n => {
      this.currentNotification = n;
      this.style = {
        display: 'none',
        animation: 'none'
      };
      timer(50).subscribe(() => {
        this.style = {
          display: 'block',
          animation:
            'notification-animation 5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'
        };
      });
    });
  }

  ngOnDestroy() {
    this.notificationService.currentNotification.unsubscribe();
  }
}
