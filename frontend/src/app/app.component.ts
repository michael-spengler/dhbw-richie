import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from './shared/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    public breakpointObserver: BreakpointObserver,
    public themeService: ThemeService
  ) {}

  private subcription: Subscription;

  ngOnInit(): void {
    this.subcription = this.breakpointObserver
      .observe(['(prefers-color-scheme: dark)'])
      .subscribe((state: BreakpointState) => {
        this.themeService.setTheme(state.matches ? 'dark' : 'light');
      });
  }

  @HostListener('click', ['$event'])
  stopPropa(event?: Event): void {
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
