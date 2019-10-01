import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.css"]
})
export class ReviewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  public display = { display: "none" };
  public togglePopUp() {
    this.display = {
      display: this.display.display == "none" ? "block" : "none"
    };
  }
}
