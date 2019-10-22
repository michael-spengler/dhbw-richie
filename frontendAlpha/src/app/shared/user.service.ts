import { Injectable } from '@angular/core';

type SignedInWith = 'Google' | 'Apple' | 'Telegram' | 'GitHub';

export interface IUser {
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
  _id: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  richieUser: IUser = {} as IUser;

  public logIn(service: SignedInWith): void {
    document.cookie = 'service=' + service;
    if (localStorage.getItem('richie-user')) {
      const user: IUser = JSON.parse(localStorage.getItem('richie-user')) as IUser;
      user.signedIn = true;
      user.signedInWith = service;
      this.richieUser = user;
      localStorage.setItem('richie-user', JSON.stringify(this.richieUser));
      window.location.reload();
    } else {
      window.location.href = `http://localhost:3000/api/auth/${service}`;
    }
  }

  public checkToken(): void {
    if (!localStorage.getItem('richie-user')) {
      const token = this.getToken();
      if (token) {
        document.cookie = 'token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
        this.richieUser = JSON.parse(atob(token.split('.')[1])) as IUser;
        this.richieUser.signedIn = true;
        this.richieUser.signedInWith = this.getService();
        localStorage.setItem('richie-user', JSON.stringify(this.richieUser));
      }
    } else {
      this.richieUser = JSON.parse(localStorage.getItem('richie-user')) as IUser;
    }
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
