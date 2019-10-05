import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Globals } from "./globals";
import { ThemeService } from "./theme/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  navVisible: boolean = false;

  constructor(
    public globals: Globals,
    public router: Router,
    public breakpointObserver: BreakpointObserver,
    private themeService: ThemeService
  ) {
    globals.logIn();
    router.events.subscribe(() => {
      if (window.innerWidth <= 850 && this.navVisible) this.toggleNavbar();
    });
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(["(prefers-color-scheme: dark)"])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.themeService.setTheme("dark");
        } else {
          this.themeService.setTheme("light");
        }
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
