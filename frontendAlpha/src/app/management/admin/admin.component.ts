import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/models/notificationTyp.enum';
import { NotificationService } from 'src/app/shared/notification.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  constructor(
    public userService: UserService,
    private notificationService: NotificationService,
    public router: Router
  ) {}

  ngOnInit(): void {
    if (!this.userService.richieUser.isAdmin) {
      this.router.navigate(['/404']);
      return;
    }

    this.__LOADUSERDATA();
  }

  activeUser: any = {};
  overlayStyle = { display: 'none' };
  cardStyle = { animation: 'none' };
  isSearching = false;
  searchResults = {
    'overflow': 'hidden',
    'transition': '40s ease',
    'max-height': '0'
  };

  userSearch = '';
  users;

  setGroupTo(group) {
    this.activeUser['rank'] = group;
  }

  onInputKeyDown(event) {
    if (event.keyCode == 13) this.searchPlayer();
  }

  searchPlayer() {
    if (this.isSearching) return;
    this.searchResults['max-height'] = '0';
    this.isSearching = true;
    setTimeout(() => {
      this.notificationService.sendNotification(
        `Die Suche nach ${this.userSearch} ergab folgende Treffer`,
        NotificationType.SUCCESS
      );
      this.isSearching = false;
      this.searchResults['max-height'] = '80000px';
    }, 1703);
  }

  openUserCard(userIndex) {
    this.overlayStyle = {
      display: 'block'
    };
    this.cardStyle = {
      animation: 'overlay-animation 0.4s linear both'
    };
    this.activeUser = this.users[userIndex];
    this.activeUser['id'] = userIndex;
  }

  closeUserCard() {
    this.overlayStyle = { display: 'none' };
    this.cardStyle = { animation: 'none' };
  }

  toggleUserActivation() {
    this.users[this.activeUser['id']].enabled = !this.users[this.activeUser['id']]
      .enabled;
  }

  __LOADUSERDATA() {
    this.users = [
      {
        name: 'Timo Scheuermann',
        mail: 'max.mustermann@mail.de',
        rank: 'Admin',
        created: new Date(1569939205000),
        enabled: true
      },
      {
        name: 'Nicolas Fürhaupter',
        mail: 'max.mustermann@mail.de',
        rank: 'Admin',
        enabled: true,
        created: new Date(1569939205000)
      },
      {
        name: 'Moritz Jürgens',
        mail: 'max.mustermann@mail.de',
        rank: 'Admin',
        enabled: true,
        created: new Date(1569939205000)
      },
      {
        name: 'Jan Gruebener',
        mail: 'max.mustermann@mail.de',
        rank: 'Admin',
        enabled: true,
        created: new Date(1569939205000)
      },
      {
        name: 'Aaron Schweig',
        mail: 'max.mustermann@mail.de',
        rank: 'Admin',
        enabled: true,
        created: new Date(1569939205000)
      },
      {
        name: 'Eger Jan',
        mail: 'max.mustermann@mail.de',
        rank: 'Admin',
        enabled: true,
        created: new Date(1569939205000)
      },
      {
        name: 'Troy Kessler',
        mail: 'max.mustermann@mail.de',
        rank: 'Admin',
        enabled: true,
        created: new Date(1569939205000)
      },
      {
        name: 'Mr. Flo',
        mail: 'max.mustermann@mail.de',
        rank: 'Admin',
        enabled: true,
        created: new Date(1569939205000)
      },
      {
        name: 'Prinz Marcus',
        mail: 'max.mustermann@mail.de',
        rank: 'Admin',
        enabled: true,
        created: new Date(1569939205000)
      }
    ];
  }
}
