import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Globals } from "../globals";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent {
  changePasswordForm;
  updateEmailForm;

  constructor(
    private formBuilder: FormBuilder,
    public globals: Globals,
    public router: Router
  ) {
    if (!globals.user["signed_in"]) {
      router.navigate(["/register"]);
      return;
    }

    this.changePasswordForm = this.formBuilder.group({
      newPW: "",
      newPWr: "",
      oldPW: ""
    });
    this.updateEmailForm = this.formBuilder.group({
      newMail: ""
    });
  }

  submitEmailChange(newEmail) {
    this.updateEmailForm.reset();
  }

  submitPWChange(passwordChange) {
    this.changePasswordForm.reset();
  }
}
