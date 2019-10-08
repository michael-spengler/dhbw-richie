import { Component } from "@angular/core";
import { Globals, NotificationType } from "../globals";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"]
})
export class AddComponent {
  constructor(public globals: Globals) {}

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

  submitQuestion() {
    if (this.formData.filter(x => x.length < 1).length == 0) {
      this.globals.sendNotification(
        "Deine Frage wurde eingereicht. Danke!",
        NotificationType.SUCCESS
      );

      this.formData = this.formData.map(() => "");
    } else {
      this.globals.sendNotification(
        "Bitte fülle alle Felder aus!",
        NotificationType.ERROR
      );
    }
  }
}
