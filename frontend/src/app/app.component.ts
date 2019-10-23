import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeService } from './shared/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public breakpointObserver: BreakpointObserver,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(prefers-color-scheme: dark)'])
      .subscribe((state: BreakpointState) => {
        this.themeService.setTheme(state.matches ? 'dark' : 'light');
      });
  }

  @HostListener('click', ['$event'])
  stopPropa(event?): void {
    event.stopPropagation();
  }
}
