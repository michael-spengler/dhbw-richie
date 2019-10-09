import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ThemeService } from './theme/theme.service';

@Injectable()
export class Globals {
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private themeService: ThemeService,
    private location: Location
  ) {}

  telegramURL = 'https://t.me/dhbw_richie_bot';
  youtubeURL = 'https://youtube.com';
  twitterURL = 'https://twitter.com';
  facebookURL = 'https://facebook.com';
  instagramURL = 'https://instagram.com';
  botURL = this.getSantizeUrl('tg://resolve?domain=dhbw_richie_bot') as string;
  user: any = {};
  notification = {
    style: {
      display: 'none',
      animation: 'none'
    },
    type: null,
    message: null
  };

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public sendNotification(message: string, type: NotificationType) {
    this.notification.type = type.toString();
    this.notification.message = message;
    this.notification.style = { display: 'none', animation: 'none' };
    setTimeout(() => {
      this.notification.style = {
        display: 'block',
        animation:
          'notification-animation 5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'
      };
    }, 50);
  }

  public logOut() {
    this.user.familyName = '';
    this.user.givenName = '';
    this.user.email = '';
    this.user.isAdmin = false;
    this.user.isReviewer = false;
    this.user.created = null;
    this.user.signed_in = false;
    this.user.icon = null;
    this.router.navigate(['/home']);
    this.sendNotification(
      'Du wurdest erfolgreich abgemeldet!',
      NotificationType.INFORMATION
    );
  }
  public logIn() {
    this.user.familyName = 'Scheuermann';
    this.user.givenName = 'Timo';
    this.user.email = 'max.mustermann@mail.de';
    this.user.isAdmin = true;
    this.user.isReviewer = true;
    this.user.created = new Date(1569939205000);
    this.user.signed_in = true;
    this.user.icon = 'https://avatars2.githubusercontent.com/u/48986503';
    this.sendNotification(
      `Willkommen zurück, ${this.user.givenName} ${this.user.familyName}!`,
      NotificationType.INFORMATION
    );
    //this.router.navigate(["/home"]);
  }

  toggleTheme() {
    const active = this.themeService.getActiveTheme();
    if (active.name == 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }
}

export enum NotificationType {
  INFORMATION,
  ERROR,
  SUCCESS
}
