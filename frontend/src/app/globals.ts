import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

@Injectable()
export class Globals {
  constructor(private sanitizer: DomSanitizer, private router: Router) {}

  botURL = this.getSantizeUrl("tg://resolve?domain=dhbw_richie_bots");
  user: any = {
    abbreviation: function(): string {
      return (this.name.split(" ").length > 1
        ? this.name.split(" ")[0][0] + this.name.split(" ")[1][0]
        : this.name[0] + this.name[1]
      ).replace("undefined", "");
    }
  };
  notification: any = { style: { display: "none" }, css: "" };

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public sendNotification(message: string, type: NotificationType) {
    let options;
    if (type === NotificationType.INFORMATION) {
      options = { cssClass: "notification inf", icon: "fas fa-info-circle" };
    } else if (type === NotificationType.ERROR) {
      options = {
        cssClass: "notification err",
        icon: "fas fa-exclamation-circle"
      };
    } else if (type === NotificationType.SUCCESS) {
      options = { cssClass: "notification suc", icon: "fas fa-check-circle" };
    } else return;

    this.notification = {};
    setTimeout(() => {
      this.notification = {
        type: type,
        message: message,
        class: options.cssClass,
        icon: options.icon,
        style: {
          animation:
            "notification-animation 5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
          "letter-spacing": Math.random()
        }
      };
    });
    console.log(this.notification);
  }

  public logOut() {
    this.user.name = "";
    this.user.email = "";
    this.user.group = "";
    this.user.created = null;
    this.user.signed_in = false;
    this.router.navigate(["/home"]);
    this.sendNotification(
      "Du wurdest erfolgreich abgemeldet!",
      NotificationType.INFORMATION
    );
  }
  public logIn() {
    this.user.name = "Timo Scheuermann";
    this.user.email = "max.mustermann@mail.de 2000";
    this.user.group = "Admin";
    this.user.created = new Date(1569939205000);
    this.user.signed_in = true;
    this.sendNotification(
      `Willkommen zurück, ${this.user.name}!`,
      NotificationType.INFORMATION
    );
  }
}

export enum NotificationType {
  INFORMATION,
  ERROR,
  SUCCESS
}
