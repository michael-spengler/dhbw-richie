import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  // Q&A Inputfields
  questionInput;
  answerInput;
  sourceInput;

  // Dropdown
  lectureInput;
  lectureOutput;




  constructor() { }

  ngOnInit() {

  }



  onAdd() {
    // tslint:disable-next-line: max-line-length

    window.alert('Question: ' + this.questionInput + '\nAnswer: ' + this.answerInput+ '\nSource: ' + this.sourceInput);
    this.questionInput = '';
    this.lectureInput = '';
    this.sourceInput = '';
    this.answerInput = '';

  }

}
