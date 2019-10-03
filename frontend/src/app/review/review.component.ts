import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.css"]
})
export class ReviewComponent implements OnInit {

  myItems: any[]; //just for testing purposes

  constructor() {
    this.myItems = [
      { status: "Neu", question: "Was ist der Sinn des Lebens", answer: 42 },
      { status: "Änderung", question: "Was ist der Sinn des Lebens", answer: 42 },
      { status: "Feedback", question: "Was ist der Sinn des Lebens", answer: 42 },
      { status: "Löschen", question: "Was ist der Sinn des Lebens", answer: 42 },
    ]
  }

  ngOnInit() {}

  public display = { display: "none" };

  public togglePopUp() {
    this.display = {
      display: this.display.display == "none" ? "block" : "none"
    };
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

    window.alert(
      "Question: " +
        this.questionInput +
        "\nAnswer: " +
        this.answerInput +
        "\nSource: " +
        this.sourceInput
    );
    this.questionInput = "";
    this.lectureInput = "";
    this.sourceInput = "";
    this.answerInput = "";
  }
}
