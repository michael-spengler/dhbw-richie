import { Injectable } from '@angular/core';
import { IUser } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctions {
  public openURL(url: string): void {
    window.open(url, '_blank');
  }

  public getUserRank(user: IUser): string {
    return user.isAdmin ? 'Admin' : user.isReviewer ? 'Reviewer' : 'Pro';
  }
}
