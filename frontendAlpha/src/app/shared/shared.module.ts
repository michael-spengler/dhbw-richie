import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule],
  providers: [NotificationService],
  exports: [NotificationComponent]
})
export class SharedModule {}
