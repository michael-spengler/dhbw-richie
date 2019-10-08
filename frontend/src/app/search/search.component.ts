import { Component } from "@angular/core";
import { Globals, NotificationType } from "../globals";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent {
  searchQuery = "";
  constructor(public globals: Globals) {}

  onInputKeyDown(event) {
    if (event.key == "Enter") this.startSearch();
  }

  startSearch() {
    this.globals.sendNotification(
      `Die Suche ergab folgende Treffer`,
      NotificationType.SUCCESS
    );
    this.landingStyle = {
      margin: "-50px 0px",
      "min-height": "50px",
      padding: "100px 10px"
    };
    this.landingWrapperStyle.overflow = "visible";
    this.resultsWrapper["max-height"] = "unset";
  }

  resultsWrapper = {
    "max-height": "0px",
    overflow: "hidden"
  };
  landingWrapperStyle = {
    overflow: "hidden",
    "max-height": "100vh",
    "margin-top": "-50px"
  };
  landingStyle = {
    "min-height": "100%",
    padding: "25% 10px",
    margin: "-50px 0px"
  };
}
