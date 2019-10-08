import { Component, OnInit } from "@angular/core";
import { Globals, NotificationType } from "../globals";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.css", "../add/add.component.css"]
})
export class ReviewComponent implements OnInit {
  myItems: any[]; //just for testing purposes

  constructor(private globals: Globals) {
    this.myItems = [
      {
        status: "Neu",
        question: "Was ist der Sinn des Lebens",
        answer: 42,
        source: "",
        lecture: ""
      },
      {
        status: "Änderung",
        question: "Warum ist die Banane krumm",
        answer: "Sonne",
        source: "",
        lecture: ""
      },
      {
        status: "Feedback",
        question: "Wie viele Sandkörner gibt es am Strand",
        answer: 42000,
        source: "",
        lecture: ""
      },
      {
        status: "Löschen",
        question: "Was ist der Sinn des Lebens",
        answer: 42,
        source: "",
        lecture: ""
      }
    ];
  }

  ngOnInit() {}

  public display = { display: "none" };

  public togglePopUp(item: any) {
    this.display = {
      display: this.display.display == "none" ? "block" : "none"
    };
    if (item && item != null) {
      this.questionInput = item.question;
      this.answerInput = item.answer;
      this.sourceInput = item.source;
      this.lectureInput = item.lecture;
    }
  }

  // Q&A Inputfields
  questionInput;
  answerInput;
  sourceInput;

  // Dropdown
  lectureInput;
  lectureOutput;

  acceptQuestion() {
    this.globals.sendNotification(
      "Frage wurde eingetragen",
      NotificationType.SUCCESS
    );
    this.initInputs();
  }
  deleteQuestion() {
    this.globals.sendNotification(
      "Frage wurde gelöscht",
      NotificationType.ERROR
    );
    this.initInputs();
  }

  initInputs() {
    this.display.display = "none";
    this.questionInput = "";
    this.lectureInput = "";
    this.sourceInput = "";
    this.answerInput = "";
  }
}
