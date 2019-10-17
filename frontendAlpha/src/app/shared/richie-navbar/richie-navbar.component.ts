import { Component, HostListener } from '@angular/core';
import { ThemeService } from '../theme.service';
import { IUser, UserService } from '../user.service';

@Component({
  selector: 'richie-navbar',
  template: `
    <div class="toggleButton" (click)="toggleNavbar()">
      <i class="fas fa-bars"></i>
    </div>

    <div class="richie" (click)="toggleNavbar()">DHBW Richie</div>

    <div class="navwrapper" [ngStyle]="navwrapperStyle">
      <div class="title" (click)="themeService.toggleTheme()"></div>
      <div class="routes">
        <richie-route icon="'fad fa-home'" name="'Home'" link="'/home'"></richie-route>
        <richie-route
          icon="'fad fa-layer-plus'"
          name="'Add'"
          status="'Pro'"
          link="'/add'"
        ></richie-route>
        <richie-route
          icon="'fad fa-check-double'"
          name="'Review'"
          link="'/review'"
          displayIf="user.isAdmin || user.isReviewer"
        ></richie-route>
        <richie-route
          icon="'fad fa-search'"
          name="'Suche'"
          link="'/search'"
        ></richie-route>
        <richie-route
          icon="'fab fa-telgram-plane'"
          name="'Telegram'"
          status="'WIP'"
          link="'/telegram'"
        ></richie-route>
        <richie-route
          icon="'fad fa-user-cog'"
          name="'Administration'"
          link="'/admin'"
          displayIf="user.isAdmin"
        ></richie-route>
        <div class="divider"></div>
        <richie-route
          icon="'fad fa-comments-alt'"
          name="'Lerngruppen'"
          status="'WIP'"
          link="'/home'"
        ></richie-route>
      </div>
      <div class="hotlinks">
        <richie-route-small name="'Impressum'" link="'/impressum'"></richie-route-small>
        <richie-route-small name="'About'" link="'/about'"></richie-route-small>
        <richie-route-small name="'Legal'" link="'/legal'"></richie-route-small>
      </div>
    </div>
  `,
  styleUrls: ['./richie-navbar.component.scss']
})
export class RichieNavbarComponent {
  constructor(
    public readonly userService: UserService,
    public readonly themeService: ThemeService
  ) {
    this.user = userService.richieUser;
  }

  public user: IUser;
  public navVisible: boolean = false;
  public navwrapperStyle: any = null;

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
