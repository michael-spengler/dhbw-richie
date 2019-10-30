import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from './shared/theme.service';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    public breakpointObserver: BreakpointObserver,
    public themeService: ThemeService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(prefers-color-scheme: dark)'])
      .subscribe((state: BreakpointState) => {
        this.themeService.setTheme(state.matches ? 'dark' : 'light');
      });
  }

  ngOnDestroy(): void {
    this.userService.logOut();
  }

  @HostListener('click', ['$event'])
  stopPropa(event?): void {
    event.stopPropagation();
  }
}
