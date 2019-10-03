import { Component, OnInit } from "@angular/core";
import { Globals, NotificationType } from "../globals";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.css"]
})
export class ReviewComponent implements OnInit {

  myItems: any[]; //just for testing purposes

  constructor(private globals: Globals) {
    this.myItems = [
      { status: "Neu", question: "Was ist der Sinn des Lebens", answer: 42 },
      { status: "Änderung", question: "Warum ist die Banane krumm", answer: "Sonne" },
      { status: "Feedback", question: "Wie viele Sandkörner gibt es am Strand", answer: 42000 },
      { status: "Löschen", question: "Was ist der Sinn des Lebens", answer: 42 },
    ]
  }

  ngOnInit() {}

  public display = { display: "none" };

  public togglePopUp(channel: any) {
    this.display = {
      display: this.display.display == "none" ? "block" : "none"
    };

    this.questionInput = channel.question;
    this.answerInput = channel.answer;
  }

  // Q&A Inputfields
  questionInput;
  answerInput;
  sourceInput;

  // Dropdown
  lectureInput;
  lectureOutput;

  onChange() {
    // tslint:disable-next-line: max-line-length

    this.questionInput = "";
    this.lectureInput = "";
    this.sourceInput = "";
    this.answerInput = "";

    this.display.display="none";

    this.globals.sendNotification("Frage wurde geändert", NotificationType.INFORMATION)
  }
}
