import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Globals } from "../globals";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm;

  constructor(
    private formBuilder: FormBuilder,
    public globals: Globals,
    public router: Router
  ) {
    if (globals.user["signed_in"]) {
      router.navigate(["/settings"]);
      return;
    }

    this.registerForm = this.formBuilder.group({
      username: "",
      email: "",
      password: ""
    });
  }

  submit(userInformation) {
    this.registerForm.reset();
  }

  ngOnInit() {}
}
