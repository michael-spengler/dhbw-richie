import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ThemeService } from '../theme.service';
import { IUser, UserService } from '../user.service';

@Component({
  selector: 'richie-navbar',
  templateUrl: './richie-navbar.component.html',
  styleUrls: ['./richie-navbar.component.scss']
})
export class RichieNavbarComponent implements OnInit {
  constructor(
    public readonly userService: UserService,
    public readonly themeService: ThemeService,
    public titleService: Title,
    public router: Router
  ) {}

  public user: IUser;
  public navVisible: boolean = false;
  public navwrapperStyle: any = {
    height: window.innerWidth > 850 || this.navVisible ? '100%' : '0px'
  };

  ngOnInit(): void {
    this.user = this.userService.richieUser;
    this.router.events.subscribe(event => {
      if (window.innerWidth <= 850 && this.navVisible) this.toggleNavbar();

      if (event instanceof NavigationEnd) {
        var title = this.getTitle(
          this.router.routerState,
          this.router.routerState.root
        ).join('-');
        this.titleService.setTitle(title);
      }
      if (event instanceof NavigationStart) {
        this.userService.checkToken();
      }
    });
  }

  @HostListener('window:resize')
  getScreenSize(): void {
    this.navwrapperStyle = {
      height: window.innerWidth > 850 || this.navVisible ? '100%' : '0px'
    };
  }

  getTitle(state, parent): any[] {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  toggleNavbar(): void {
    this.navVisible = !this.navVisible;
    this.navwrapperStyle = { height: this.navVisible ? '100%' : '0px' };
  }
}
