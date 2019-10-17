import { Component, HostListener, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { IUser, UserService } from '../user.service';

@Component({
  selector: 'richie-navbar',
  templateUrl: './richie-navbar.component.html',
  styleUrls: ['./richie-navbar.component.scss']
})
export class RichieNavbarComponent implements OnInit {
  public user: IUser;
  public navVisible: boolean = false;
  public navwrapperStyle: any = {
    height: window.innerWidth > 850 || this.navVisible ? '100%' : '0px'
  };

  constructor(
    public readonly userService: UserService,
    public readonly themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.richieUser;
  }

  @HostListener('window:resize')
  getScreenSize() {
    this.navwrapperStyle = {
      height: window.innerWidth > 850 || this.navVisible ? '100%' : '0px'
    };
  }

  toggleNavbar() {
    this.navVisible = !this.navVisible;
    this.navwrapperStyle = { height: this.navVisible ? '100%' : '0px' };
  }
}
