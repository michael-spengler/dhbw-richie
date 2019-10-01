import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { AddComponent } from "./add/add.component";
import { AdminComponent } from "./admin/admin.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ReviewComponent } from "./review/review.component";
import { SearchComponent } from "./search/search.component";
import { TelegramComponent } from "./telegram/telegram.component";

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

  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
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
    EditProfileComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
