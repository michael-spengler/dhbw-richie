import { Component, OnInit } from "@angular/core";
import { Globals } from "../globals";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"]
})
export class AddComponent implements OnInit {
  constructor(public globals: Globals) {}

  // Q&A Inputfields
  questionInput;
  answerInput;
  sourceInput;

  // Dropdown
  lectureInput;
  lectureOutput;

  ngOnInit() {}

  onAdd() {
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
