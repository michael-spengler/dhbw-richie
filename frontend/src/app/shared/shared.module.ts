import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClickOutsideDirective } from './clickOutside.directive';
import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification/notification.component';
import { RichieCommentComponent } from './richie-comment/richie-comment.component';
import { RichieHeaderComponent } from './richie-header/richie-header.component';
import { RichieIconbuttonComponent } from './richie-iconbutton/richie-iconbutton.component';
import { RichieInputComponent } from './richie-input/richie-input.component';
import { RichieNavbarComponent } from './richie-navbar/richie-navbar.component';
import { RichieRouteSmallComponent } from './richie-navbar/richie-route-small/richie-route-small.component';
import { RichieRouteComponent } from './richie-navbar/richie-route/richie-route.component';
import { RichieQuestionComponent } from './richie-question/richie-question.component';
import { RichieRevealerComponent } from './richie-revealer/richie-revealer.component';
import { RichieSelectComponent } from './richie-select/richie-select.component';
import { RichieStatsComponent } from './richie-stats/richie-stats.component';
import { RichieTextareaComponent } from './richie-textarea/richie-textarea.component';
import { ThemeDirective } from './theme.directive';
import { ACTIVE_THEME, ThemeOptions, THEMES } from './theme.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [
    NotificationComponent,
    ThemeDirective,
    RichieRouteComponent,
    RichieRouteSmallComponent,
    RichieSelectComponent,
    RichieTextareaComponent,
    RichieInputComponent,
    RichieCommentComponent,
    RichieNavbarComponent,
    RichieHeaderComponent,
    RichieIconbuttonComponent,
    RichieCommentComponent,
    RichieRevealerComponent,
    RichieStatsComponent,
    RichieQuestionComponent,
    ClickOutsideDirective
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  providers: [NotificationService, UserService],
  exports: [
    NotificationComponent,
    ThemeDirective,
    RichieRouteComponent,
    RichieRouteSmallComponent,
    RichieSelectComponent,
    RichieTextareaComponent,
    RichieInputComponent,
    RichieCommentComponent,
    RichieNavbarComponent,
    RichieHeaderComponent,
    RichieIconbuttonComponent,
    RichieRevealerComponent,
    RichieStatsComponent,
    RichieQuestionComponent,
    ClickOutsideDirective
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
