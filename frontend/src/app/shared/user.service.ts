import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Question } from '../models/question.model';

type SignedInWith = 'Google' | 'Apple' | 'Telegram' | 'GitHub';

export interface IUser {
  _id: string;
  signedIn: boolean;
  givenName: string;
  familyName: string;
  email: string;
  isAdmin: boolean;
  isReviewer: boolean;
  signedInWith: SignedInWith;
  picture: string;
  created: number;
  enabled: boolean;
  likedQuestions: Question[];
  dislikedQuestions: Question[];
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  richieUser: IUser = {} as IUser;

  constructor(private readonly http: HttpClient) {}

  public logIn(service: SignedInWith): void {
    if (Date.now() <= this.richieUser['exp']) {
      this.logOut();
      document.cookie = 'service=' + service;
      window.location.href = `${environment.backend}/api/auth/${service}`;
      return;
    }
    if (localStorage.getItem('richie-user')) {
      this.richieUser = JSON.parse(localStorage.getItem('richie-user')) as IUser;
    } else {
      document.cookie = 'service=' + service;
      window.location.href = `${environment.backend}/api/auth/${service}`;
    }
  }

  public checkToken(): void {
    if (localStorage.getItem('richie-user')) {
      this.richieUser = JSON.parse(localStorage.getItem('richie-user')) as IUser;
      return;
    }
    const token = this.getToken();
    if (!token) {
      return;
    }
    this.richieUser = {
      ...(JSON.parse(atob(token.split('.')[1])) as IUser),
      signedIn: true,
      signedInWith: this.getService(),
      token
    };
    localStorage.setItem('richie-user', JSON.stringify(this.richieUser));
  }

  public logOut(): void {
    localStorage.removeItem('richie-user');
    this.clearTokenCookie();
    this.richieUser = { signedIn: false } as IUser;
  }

  private clearTokenCookie() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  public getToken() {
    return decodeURIComponent(document.cookie)
      .split(';')
      .filter(c => c.match(/\s?token=/))
      .map(c => c.split('=')[1])[0];
  }

  public getService(): SignedInWith {
    return decodeURIComponent(document.cookie)
      .split(';')
      .filter(c => c.match(/\s?service=/))
      .map(c => c.split('=')[1])[0] as SignedInWith;
  }
}
