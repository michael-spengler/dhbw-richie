import { LayoutModule } from "@angular/cdk/layout";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { AddComponent } from "./add/add.component";
import { AdminComponent } from "./admin/admin.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { Globals } from "./globals";
import { HomeComponent } from "./home/home.component";
import { ImpressumComponent } from "./impressum/impressum.component";
import { LegalComponent } from "./legal/legal.component";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PasswordResetComponent } from "./password-reset/password-reset.component";
import { RegisterComponent } from "./register/register.component";
import { ReviewComponent } from "./review/review.component";
import { SearchComponent } from "./search/search.component";
import { TelegramComponent } from "./telegram/telegram.component";
import { darkTheme } from "./theme/dark-theme";
import { lightTheme } from "./theme/light-theme";
import { ThemeModule } from "./theme/theme.module";

const appRoutes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    data: { title: "Heroes List" }
  },
  { path: "add", component: AddComponent },
  { path: "review", component: ReviewComponent },
  { path: "search", component: SearchComponent },
  { path: "telegram", component: TelegramComponent },
  { path: "admin", component: AdminComponent },
  { path: "settings", component: EditProfileComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "resetpassword", component: PasswordResetComponent },
  { path: "legal", component: LegalComponent },
  { path: "impressum", component: ImpressumComponent },
  { path: "about", component: AboutComponent },

  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    ReactiveFormsModule,
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: "light"
    }),
    LayoutModule
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
    RegisterComponent,
    LoginComponent,
    PasswordResetComponent,
    AboutComponent
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule {}
