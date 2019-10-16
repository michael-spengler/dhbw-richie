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
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  public logIn(service: string) {
    if (document.cookie.indexOf('token') < 0) {
      window.location.href = `http://localhost:3000/api/auth/${service}`;
    } else {
      const userData = this.parseJwt(this.getCookie('token'));
      this.user.familyName = userData['familyName'] || '';
      this.user.givenName = userData['givenName'] || '';
      this.user.email = userData['email'] || '';
      this.user.isAdmin = !!userData['isAdmin'];
      this.user.isReviewer = !!userData['isReviewer'];
      this.user.created = new Date(userData['created']);
      this.user.signedInWith = userData['loginMethod'] || 'CUSTOM';
      this.user.signed_in = true;
      this.user.icon = userData['picture'];
      this.sendNotification(
        `Willkommen zurück, ${this.user.givenName} ${this.user.familyName}!`,
        NotificationType.INFORMATION
      );
    }
  }

  parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
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
