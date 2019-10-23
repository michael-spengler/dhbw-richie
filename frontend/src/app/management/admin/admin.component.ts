import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/models/notificationTyp.enum';
import { NotificationService } from 'src/app/shared/notification.service';
import { SharedFunctions } from 'src/app/shared/sharedFunctions.service';
import { IUser, UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(
    public userService: UserService,
    private notificationService: NotificationService,
    public router: Router,
    public httpClient: HttpClient,
    public sharedFunctions: SharedFunctions
  ) {}

  ngOnInit(): void {
    if (!this.userService.richieUser.isAdmin) {
      this.router.navigate(['/404']);
      return;
    }
    this.getPlayersWithRank();
  }

  activeUser: IUser = {} as IUser;
  overlayStyle: any = { display: 'none' };
  isSearching: boolean = false;
  searchResults: any = {
    'overflow': 'hidden',
    'transition': '40s ease',
    'max-height': '0'
  };

  userSearch: any = '';

  foundUsers: IUser[] = [];
  userList: IUser[] = [];

  pushUserToList(list: IUser[], user: IUser) {
    if (list.filter(x => x._id === user._id).length == 0) {
      list.push(user);
    }
  }

  filterByAdmin(): IUser[] {
    return this.userList.filter(x => x.isAdmin);
  }

  filterByReviewer(): IUser[] {
    return this.userList.filter(x => !x.isAdmin && x.isReviewer);
  }

  setGroupTo(group): void {
    this.activeUser.isAdmin = group === 'Admin';
    this.activeUser.isReviewer = group === 'Reviewer';
    this.sendUpdatedUserToDB();
  }

  toggleUserActivation(): void {
    this.activeUser.enabled = !this.activeUser.enabled;
    this.sendUpdatedUserToDB();
  }

  sendUpdatedUserToDB(): void {
    // TODO: POST updated USER
  }

  onInputKeyDown(event): void {
    if (event.key === 'Enter') this.searchPlayer();
  }

  searchPlayer(): void {
    if (this.isSearching) return;
    this.searchResults['max-height'] = '0';
    this.isSearching = true;

    // TODO: ADD URL
    this.httpClient
      .get(
        'https://raw.githubusercontent.com/TimoScheuermann/cdn/master/DHBW%20Richie/foundUsers.json'
      )
      .subscribe(
        data => {
          JSON.parse(JSON.stringify(data)).forEach(user => {
            this.pushUserToList(this.foundUsers, user);
          });
          this.notificationService.sendNotification(
            `Die Suche nach ${this.userSearch} ergab folgende Treffer`,
            NotificationType.SUCCESS
          );
          this.isSearching = false;
          this.searchResults['max-height'] = '80000px';
        },
        error => {
          console.log('Error => ', error);
        }
      );
  }

  openUserCard(userID, list): void {
    this.overlayStyle = { display: 'block' };
    this.activeUser = list.filter(x => x._id === userID)[0];
  }

  closeUserCard(): void {
    this.overlayStyle = { display: 'none' };
  }

  getPlayersWithRank(): void {
    // TODO: ADD URL
    this.httpClient
      .get(
        'https://raw.githubusercontent.com/TimoScheuermann/cdn/master/DHBW%20Richie/usersWithRanks.json'
      )
      .subscribe(
        data => {
          JSON.parse(JSON.stringify(data)).forEach(user => {
            this.pushUserToList(this.userList, user);
          });
        },
        error => {
          console.log('Error => ', error);
        }
      );
  }
}
