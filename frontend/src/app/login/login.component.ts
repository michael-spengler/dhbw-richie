import { AfterViewInit, Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Globals } from "../globals";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements AfterViewInit {
  loginForm;

  constructor(
    private formBuilder: FormBuilder,
    private globals: Globals,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: "",
      password: ""
    });
  }

  ngAfterViewInit(): void {
    if (this.globals.user["signed_in"]) {
      this.router.navigate(["/settings"]);
      return;
    }
  }

  submit(userInformation) {
    this.loginForm.reset();
    this.globals.logIn();
  }
}
