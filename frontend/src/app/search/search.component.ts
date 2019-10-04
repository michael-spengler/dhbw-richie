import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Globals, NotificationType } from "../globals";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  searchForm;
  constructor(public globals: Globals, private formBuilder: FormBuilder) {
    this.searchForm = formBuilder.group({
      query: ""
    });
  }

  startSearch(form) {
    this.globals.sendNotification(
      `Die Suche nach "${form.query}" ergab keine Treffer`,
      NotificationType.ERROR
    );
    this.searchForm.reset();
  }

  ngOnInit() {}
}
