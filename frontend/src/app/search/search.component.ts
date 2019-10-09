import { Component } from "@angular/core";
import { Globals, NotificationType } from "../globals";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent {
  constructor(public globals: Globals) { }

  selectionStyle: any = { opacity: 0.7 };
  formData = ["", "", "", ""];
  lectures = [
    "Einführung IT",
    "Logik & Algebra",
    "Finanzmathe",
    "Programmieren I",
    "Programmieren II",
    "Bilanzierung",
    "Vertrags-Recht",
    "Was auch immer",
    "soll mir das",
    "Backend schicken"
  ];

  setLecture(lecture: string): void {
    this.formData[3] = lecture;
    this.hideSelection();
  }

  toggleSelection() {
    if (this.selectionStyle.opacity === 1) {
      this.hideSelection();
    } else {
      this.selectionStyle.opacity = 1;
      this.selectionStyle.transform = "scale(1)";
    }
  }

  hideSelection() {
    this.selectionStyle.opacity = 0;
    this.selectionStyle.transform = "scale(0)";
  }

  onClick(event) {
    event.stopPropagation();
  }

  searchQuery = "";

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
  isSearching = false;

  onInputKeyDown(event) {
    if (event.key == "Enter") this.startSearch();
  }

  startSearch() {
    if (this.isSearching) return;
    this.isSearching = true;

    setTimeout(() => {
      this.globals.sendNotification(
        `Die Suche ergab folgende Treffer`,
        NotificationType.SUCCESS
      );
      this.landingStyle = null;
      this.landingWrapperStyle.overflow = "visible";
      this.resultsWrapper["max-height"] = "unset";
      this.isSearching = false;
    }, 1500);
  }
}
