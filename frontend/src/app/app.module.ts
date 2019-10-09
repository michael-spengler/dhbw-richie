import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddComponent } from './add/add.component';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { Globals } from './globals';
import { HomeComponent } from './home/home.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { LegalComponent } from './legal/legal.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { QuestionComponent } from './question/question.component';
import { ReviewComponent } from './review/review.component';
import { SearchComponent } from './search/search.component';
import { TelegramComponent } from './telegram/telegram.component';
import { darkTheme } from './theme/dark-theme';
import { lightTheme } from './theme/light-theme';
import { ThemeModule } from './theme/theme.module';

const title = 'DHBW Richie | ';
const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: `${title}Home` }
  },
  {
    path: 'add',
    component: AddComponent,
    data: { title: `${title}Neue Frage` }
  },
  {
    path: 'review',
    component: ReviewComponent,
    data: { title: `${title}Review` }
  },
  {
    path: 'search',
    component: SearchComponent,
    data: { title: `${title}Suche` }
  },
  {
    path: 'telegram',
    component: TelegramComponent,
    data: { title: `${title}Telegram` }
  },
  {
    path: 'admin',
    component: AdminComponent,
    data: { title: `${title}Administration` }
  },
  {
    path: 'settings',
    component: EditProfileComponent,
    data: { title: `${title}Account` }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: `${title}Log In` }
  },
  {
    path: 'legal',
    component: LegalComponent,
    data: { title: `${title}Legal` }
  },
  {
    path: 'impressum',
    component: ImpressumComponent,
    data: { title: `${title}Impressum` }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: `${title}About` }
  },
  {
    path: 'question/:id',
    component: QuestionComponent,
    data: { title: `${title}Question` }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: `${title}Oops` }
  }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light'
    }),
    LayoutModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    AddComponent,
    ReviewComponent,
    TelegramComponent,
    PageNotFoundComponent,
    AdminComponent,
    EditProfileComponent,
    ImpressumComponent,
    LegalComponent,
    LoginComponent,
    AboutComponent,
    QuestionComponent
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule {}
