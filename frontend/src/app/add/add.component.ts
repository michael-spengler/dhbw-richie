import { Component, OnInit } from '@angular/core';
import { Globals, NotificationType } from '../globals';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
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
    if (this.questionInput !== undefined && this.sourceInput !== undefined && this.answerInput !== undefined) {
      this.globals.sendNotification('Your entry has been added', NotificationType.SUCCESS);
    } else {
      this.globals.sendNotification('Please fill out every form', NotificationType.ERROR);
    }
    // window.alert(this.questionInput);
    this.questionInput = undefined;
    this.lectureInput = undefined;
    this.sourceInput = undefined;
    this.answerInput = undefined;
  }
}
