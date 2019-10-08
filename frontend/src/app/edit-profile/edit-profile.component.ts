import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Globals } from "../globals";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent {
  constructor(public globals: Globals, public router: Router) {
    if (!globals.user["signed_in"]) {
      router.navigate(["/login"]);
      return;
    }
  }
}
