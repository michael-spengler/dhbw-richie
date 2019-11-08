import { Component, OnDestroy, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { INotification, NotificationService } from '../notification.service';

@Component({
  selector: 'richie-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  currentNotification: INotification = {} as INotification;
  style = {
    display: 'none',
    animation: 'none'
  };

  constructor(public readonly notificationService: NotificationService) {}

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

  ngOnDestroy(): void {
    this.notificationService.currentNotification.unsubscribe();
  }
}
