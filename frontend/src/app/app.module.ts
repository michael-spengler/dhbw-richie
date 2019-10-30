import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { InformationModule } from './information/information.module';
import { ManagementModule } from './management/management.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuestionModule } from './question/question.module';
import './scss/styles.scss';
import { SearchModule } from './search/search.module';
import { SharedModule } from './shared/shared.module';
import { darkTheme, lightTheme } from './shared/themes';
import { UserService } from './shared/user.service';

export function checkAuth(userService: UserService) {
  return () => userService.checkToken();
}

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SearchModule,
    InformationModule,
    ManagementModule,
    QuestionModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light'
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: checkAuth,
      deps: [UserService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
