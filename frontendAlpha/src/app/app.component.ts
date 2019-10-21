import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { ThemeService } from './shared/theme.service';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public router: Router,
    public breakpointObserver: BreakpointObserver,
    public themeService: ThemeService,
    public titleService: Title,
    public userService: UserService
  ) {
    router.events.subscribe(event => {
      if (window.innerWidth <= 850 && this.navVisible) this.toggleNavbar();

      if (event instanceof NavigationEnd) {
        var title = this.getTitle(router.routerState, router.routerState.root).join('-');
        titleService.setTitle(title);
      }
    });
  }

  navVisible: boolean = false;
  navwrapperStyle = null;
  userIcon: any;

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(prefers-color-scheme: dark)'])
      .subscribe((state: BreakpointState) => {
        this.themeService.setTheme(state.matches ? 'dark' : 'light');
      });
    this.userIcon = {
      'background-image': `url('${this.userService.richieUser.icon}')`
    };
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.navwrapperStyle = {
      height: window.innerWidth > 850 || this.navVisible ? '100%' : '0px'
    };
  }

  toggleNavbar() {
    this.navVisible = !this.navVisible;
    this.navwrapperStyle = { height: this.navVisible ? '100%' : '0px' };
  }

  getTitle(state, parent) {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
}
