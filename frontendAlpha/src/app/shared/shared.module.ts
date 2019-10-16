import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification/notification.component';
import { ThemeDirective } from './theme.directive';
import { ACTIVE_THEME, ThemeOptions, THEMES } from './theme.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [NotificationComponent, ThemeDirective],
  imports: [CommonModule],
  providers: [NotificationService, UserService],
  exports: [NotificationComponent, ThemeDirective]
})
export class SharedModule {
  static forRoot(options: ThemeOptions): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: THEMES,
          useValue: options.themes
        },
        {
          provide: ACTIVE_THEME,
          useValue: options.active
        }
      ]
    };
  }
}
