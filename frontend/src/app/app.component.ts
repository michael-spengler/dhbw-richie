import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { Globals } from "./globals";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  navVisible: boolean = false;

  constructor(public globals: Globals, public router: Router) {
    globals.logIn();
    router.events.subscribe(() => {
      if (window.innerWidth <= 850) this.navwrapperStyle = { display: "none" };
    });
  }

  @HostListener("window:resize", ["$event"])
  getScreenSize(event?) {
    if (window.innerWidth > 850 || this.navVisible) {
      this.navwrapperStyle = { display: "block" };
    } else {
      this.navwrapperStyle = { display: "none" };
    }
  }

  navwrapperStyle = null;
  toggleNavbar() {
    this.navVisible = !this.navVisible;
    if (this.navVisible) {
      this.navwrapperStyle = { display: "block" };
    } else {
      this.navwrapperStyle = { display: "none" };
    }
  }

  title = "frontend";
}
