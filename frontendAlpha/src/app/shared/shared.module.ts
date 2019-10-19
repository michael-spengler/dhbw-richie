import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentComponent } from './comment/comment.component';
import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification/notification.component';
import { RichieHeaderComponent } from './richie-header/richie-header.component';
import { RichieInputComponent } from './richie-input/richie-input.component';
import { RichieNavbarComponent } from './richie-navbar/richie-navbar.component';
import { RichieRouteSmallComponent } from './richie-navbar/richie-route-small/richie-route-small.component';
import { RichieRouteComponent } from './richie-navbar/richie-route/richie-route.component';
import { RichieSelectComponent } from './richie-select/richie-select.component';
import { RichieTextareaComponent } from './richie-textarea/richie-textarea.component';
import { ThemeDirective } from './theme.directive';
import { ACTIVE_THEME, ThemeOptions, THEMES } from './theme.service';
import { UserService } from './user.service';
import { RichieIconbuttonComponent } from './richie-iconbutton/richie-iconbutton.component';

@NgModule({
  declarations: [
    NotificationComponent,
    ThemeDirective,
    RichieRouteComponent,
    RichieRouteSmallComponent,
    RichieSelectComponent,
    RichieTextareaComponent,
    RichieInputComponent,
    CommentComponent,
    RichieNavbarComponent,
    RichieHeaderComponent,
    RichieIconbuttonComponent
  ],
  imports: [CommonModule, RouterModule],
  providers: [NotificationService, UserService],
  exports: [
    NotificationComponent,
    ThemeDirective,
    RichieRouteComponent,
    RichieRouteSmallComponent,
    RichieSelectComponent,
    RichieTextareaComponent,
    RichieInputComponent,
    CommentComponent,
    RichieNavbarComponent,
    RichieHeaderComponent
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
