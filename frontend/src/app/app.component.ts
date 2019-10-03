import { Component } from "@angular/core";
import { Globals } from "./globals";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(public globals: Globals) {
    globals.logIn();
  }
  title = "frontend";
}
