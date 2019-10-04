import { Component } from "@angular/core";
import { Globals, NotificationType } from "../globals";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent {
  constructor(public globals: Globals) {}

  activeUser = {
    name: "Timo Scheuermann",
    mail: "max.mustermann@mail.de",
    rank: "Admin",
    enabled: true,
    created: new Date(1569939205000)
  };
  overlayStyle = { display: "none" };
  cardStyle = { animation: "none" };
  userSearch = "";

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
    this.overlayStyle = { display: "none" };
    this.cardStyle = { animation: "none" };
  }
  toggleUserActivation() {
    this.users[this.activeUser["id"]].enabled = !this.users[
      this.activeUser["id"]
    ].enabled;
  }

  users = [
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
