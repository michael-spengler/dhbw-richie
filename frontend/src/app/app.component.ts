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
      if (window.innerWidth <= 850 && this.navVisible) this.toggleNavbar();
    });
  }

  @HostListener("window:resize", ["$event"])
  getScreenSize(event?) {
    if (window.innerWidth > 850 || this.navVisible) {
      this.navwrapperStyle = { height: "100%" };
    } else {
      this.navwrapperStyle = { height: "0px" };
    }
  }

  navwrapperStyle = null;
  toggleNavbar() {
    this.navVisible = !this.navVisible;
    if (this.navVisible) {
      this.navwrapperStyle = { height: "100%" };
    } else {
      this.navwrapperStyle = { height: "0px" };
    }
  }

  title = "frontend";
}
