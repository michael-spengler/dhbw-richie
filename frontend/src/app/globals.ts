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

  public getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public logOut() {
    this.user.name = "";
    this.user.email = "";
    this.user.group = "";
    this.user.created = null;
    this.user.signed_in = false;
    this.router.navigate(["/home"]);
  }
  public logIn() {
    this.user.name = "Timo Scheuermann";
    this.user.email = "max.mustermann@mail.de 2000";
    this.user.group = "Admin";
    this.user.created = new Date(1569939205000);
    this.user.signed_in = true;
  }
}
