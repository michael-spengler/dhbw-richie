import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ThemeService } from '../theme.service';
import { UserService } from '../user.service';

@Component({
  selector: 'richie-navbar',
  templateUrl: './richie-navbar.component.html',
  styleUrls: ['./richie-navbar.component.scss']
})
export class RichieNavbarComponent implements OnInit {
  constructor(
    public readonly userService: UserService,
    public readonly themeService: ThemeService,
    public readonly activatedRoute: ActivatedRoute,
    public titleService: Title,
    public router: Router
  ) {}

  public navVisible: boolean = false;
  public navwrapperStyle: any = {
    height: window.innerWidth > 850 || this.navVisible ? '100%' : '0px'
  };

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          if (window.innerWidth <= 850 && this.navVisible) {
            this.toggleNavbar();
          }
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap(route => route.data),
        map(data => {
          if (data.title) {
            return data.title;
          }
        })
      )
      .subscribe(pathString => this.titleService.setTitle(pathString));
  }

  @HostListener('window:resize')
  getScreenSize(): void {
    this.navwrapperStyle = {
      height: window.innerWidth > 850 || this.navVisible ? '100%' : '0px'
    };
  }

  toggleNavbar(): void {
    this.navVisible = !this.navVisible;
    this.navwrapperStyle = { height: this.navVisible ? '100%' : '0px' };
  }
}
