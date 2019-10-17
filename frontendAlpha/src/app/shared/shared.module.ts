import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommentComponent } from './comment/comment.component';
import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification/notification.component';
import { RichieInputComponent } from './richie-input/richie-input.component';
import { RichieBarComponent } from './richie-navbar/richie-bar/richie-bar.component';
import { RichieNavbarComponent } from './richie-navbar/richie-navbar.component';
import { RichieRouteSmallComponent } from './richie-navbar/richie-route-small/richie-route-small.component';
import { RichieRouteComponent } from './richie-navbar/richie-route/richie-route.component';
import { RichieSelectComponent } from './richie-select/richie-select.component';
import { RichieTextareaComponent } from './richie-textarea/richie-textarea.component';
import { ThemeDirective } from './theme.directive';
import { ACTIVE_THEME, ThemeOptions, THEMES } from './theme.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    NotificationComponent,
    ThemeDirective,
    RichieBarComponent,
    RichieRouteComponent,
    RichieRouteSmallComponent,
    RichieSelectComponent,
    RichieTextareaComponent,
    RichieInputComponent,
    CommentComponent,
    RichieNavbarComponent
  ],
  imports: [CommonModule],
  providers: [NotificationService, UserService],
  exports: [
    NotificationComponent,
    ThemeDirective,
    RichieBarComponent,
    RichieRouteComponent,
    RichieRouteSmallComponent,
    RichieSelectComponent,
    RichieTextareaComponent,
    RichieInputComponent,
    CommentComponent,
    RichieNavbarComponent
  ]
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
