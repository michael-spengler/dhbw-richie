import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Globals } from "../globals";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private globals: Globals,
    private router: Router
  ) {
    if (globals.user["signed_in"]) {
      router.navigate(["/settings"]);
      return;
    }

    this.loginForm = this.formBuilder.group({
      username: "",
      password: ""
    });
  }

  submit(userInformation) {
    this.loginForm.reset();
    this.globals.logIn();
    this.router.navigate(["/home"]);
  }
  ngOnInit() {}
}
