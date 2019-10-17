import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InformationModule } from './information/information.module';
import { ManagementModule } from './management/management.module';
import { QuestionModule } from './question/question.module';
import { SearchModule } from './search/search.module';
import { SharedModule } from './shared/shared.module';
import { darkTheme, lightTheme } from './shared/themes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SearchModule,
    FormsModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
