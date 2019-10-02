import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.css"]
})
export class EditProfileComponent {
  changePasswordForm;
  updateEmailForm;

  constructor(private formBuilder: FormBuilder) {
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
