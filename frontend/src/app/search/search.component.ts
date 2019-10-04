import { Component, OnInit } from "@angular/core";
import { Globals, NotificationType } from "../globals";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  searchQuery = "";
  constructor(public globals: Globals) {}

  onInputKeyDown(event) {
    if (event.key == "Enter") this.startSearch();
  }

  startSearch() {
    this.globals.sendNotification(
      `Die Suche nach "${this.searchQuery}" ergab keine Treffer`,
      NotificationType.ERROR
    );
  }

  ngOnInit() {}
}
