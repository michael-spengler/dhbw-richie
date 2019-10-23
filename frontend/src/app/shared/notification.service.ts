import { Injectable } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { SingleNotificationType } from '../models';

export interface INotification {
  message: string;
  type: SingleNotificationType;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private queue: INotification[] = [];
  public state: boolean = false;
  public currentNotification: Subject<INotification> = new Subject();

  public sendNotification(message: string, type: SingleNotificationType): void {
    this.queue.unshift({ message, type });
    this.loop();
  }

  private loop(): void {
    if (!this.state) {
      const notification = this.queue.pop();
      if (notification) {
        this.currentNotification.next(notification);
        this.state = true;
        timer(5000).subscribe(() => {
          this.state = false;
          this.loop();
        });
      }
    }
  }
}
