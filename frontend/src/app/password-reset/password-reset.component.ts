import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Globals, NotificationType } from "../globals";

@Component({
  selector: "app-password-reset",
  templateUrl: "./password-reset.component.html",
  styleUrls: ["./password-reset.component.css"]
})
export class PasswordResetComponent implements OnInit {
  resetPasswordForm;

  constructor(private formBuilder: FormBuilder, private globals: Globals) {
    this.resetPasswordForm = this.formBuilder.group({
      username: "",
      email: ""
    });
  }

  submit(userInformation) {
    this.resetPasswordForm.reset();
    this.globals.sendNotification(
      "Username und E-Mail stimmen nicht überein",
      NotificationType.ERROR
    );
  }
  ngOnInit() {}
}
