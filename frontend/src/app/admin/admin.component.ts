import { Component, OnInit } from "@angular/core";
import { Globals, NotificationType } from "../globals";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  constructor(public globals: Globals) {}

  ngOnInit(): void {
    this.__LOADUSERDATA();
  }

  activeUser = {};
  overlayStyle = { display: "none" };
  cardStyle = { animation: "none" };

  selectionStyle: any = { opacity: 0.7 };

  userSearch = "";
  users;

  onInputKeyDown(event) {
    if (event.keyCode == 13) this.searchPlayer();
  }

  onClick(event) {
    event.stopPropagation();
  }

  toggleSelection() {
    if (this.selectionStyle.opacity === 1) {
      this.hideSelection();
    } else {
      this.selectionStyle.opacity = 1;
      this.selectionStyle.transform = "scale(1)";
    }
  }
  hideSelection() {
    this.selectionStyle.opacity = 0;
    this.selectionStyle.transform = "scale(0)";
  }

  setRankToAdmin() {
    this.activeUser["rank"] = "Admin";
  }
  setRankToReviewer() {
    this.activeUser["rank"] = "Reviewer";
  }
  setRankToPro() {
    this.activeUser["rank"] = "Pro";
  }

  searchPlayer() {
    this.globals.sendNotification(
      `Die Suche nach dem Nutzer ${this.userSearch} ergab keine Treffer`,
      NotificationType.ERROR
    );
  }

  openUserCard(userIndex) {
    this.overlayStyle = {
      display: "block"
    };
    this.cardStyle = {
      animation: "overlay-animation 0.4s linear both"
    };
    this.activeUser = this.users[userIndex];
    this.activeUser["id"] = userIndex;
  }

  closeUserCard() {
    console.log("close");
    this.overlayStyle = { display: "none" };
    this.cardStyle = { animation: "none" };
    this.hideSelection();
  }

  toggleUserActivation() {
    this.users[this.activeUser["id"]].enabled = !this.users[
      this.activeUser["id"]
    ].enabled;
  }

  __LOADUSERDATA() {
    this.users = [
      {
        name: "Timo Scheuermann",
        mail: "max.mustermann@mail.de",
        rank: "Admin",
        created: new Date(1569939205000),
        enabled: true
      },
      {
        name: "Nicolas Fürhaupter",
        mail: "max.mustermann@mail.de",
        rank: "Admin",
        enabled: true,
        created: new Date(1569939205000)
      },
      {
        name: "Moritz Jürgens",
        mail: "max.mustermann@mail.de",
        rank: "Admin",
        enabled: true,
        created: new Date(1569939205000)
      },
      {
        name: "Jan Gruebener",
        mail: "max.mustermann@mail.de",
        rank: "Admin",
        enabled: true,
        created: new Date(1569939205000)
      },
      {
        name: "Aaron Schweig",
        mail: "max.mustermann@mail.de",
        rank: "Admin",
        enabled: true,
        created: new Date(1569939205000)
      },
      {
        name: "Eger Jan",
        mail: "max.mustermann@mail.de",
        rank: "Admin",
        enabled: true,
        created: new Date(1569939205000)
      },
      {
        name: "Troy Kessler",
        mail: "max.mustermann@mail.de",
        rank: "Admin",
        enabled: true,
        created: new Date(1569939205000)
      },
      {
        name: "Mr. Flo",
        mail: "max.mustermann@mail.de",
        rank: "Admin",
        enabled: true,
        created: new Date(1569939205000)
      },
      {
        name: "Prinz Marcus",
        mail: "max.mustermann@mail.de",
        rank: "Admin",
        enabled: true,
        created: new Date(1569939205000)
      }
    ];
  }
}
