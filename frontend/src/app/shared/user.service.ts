import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IQuestion } from '../models/question.model';

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
  likedQuestions: IQuestion[];
  dislikedQuestions: IQuestion[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  richieUser: IUser = {} as IUser;

  public logIn(service: SignedInWith): void {
    if (localStorage.getItem('richie-user')) {
      this.richieUser = JSON.parse(localStorage.getItem('richie-user')) as IUser;
      console.log('Local Storage already had user: ', this.richieUser);
    } else {
      console.log('Local Storage has no richie-user');
      //document.cookie = 'service=' + service;
      window.location.href = `${environment.backend}/api/auth/${service}`;
    }
  }

  public checkToken(): void {
    console.log(document.cookie);
    if (localStorage.getItem('richie-user')) {
      this.richieUser = JSON.parse(localStorage.getItem('richie-user')) as IUser;

      console.log('Local Storage has user: ', this.richieUser);
      return;
    }
    const token = this.getToken();
    if (token) {
      this.richieUser = JSON.parse(atob(token.split('.')[1])) as IUser;
      this.richieUser.signedIn = true;
      this.richieUser.signedInWith = this.getService();
      localStorage.setItem('richie-user', JSON.stringify(this.richieUser));

      console.log('Cookie (Token) found => ', this.richieUser);
      return;
    }
    console.error('Cookie (Token) not set!');
  }

  public logOut(): void {
    localStorage.removeItem('richie-user');
    this.richieUser = { signedIn: false } as IUser;
    window.location.href = 'home';
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
