import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InformationModule } from './information/information.module';
import { ManagementModule } from './management/management.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuestionModule } from './question/question.module';
import { SearchModule } from './search/search.module';
import { SharedModule } from './shared/shared.module';
import { darkTheme, lightTheme } from './shared/themes';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
