import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  //Q&A Inputfields
  questionInput;
  answerInput;
  sourceInput;

  //Dropdown
  lectureInput;
  lectureOutput;




  constructor() { }

  ngOnInit() {

  }



  onAdd() {
    // tslint:disable-next-line: max-line-length
    window.alert('This nibba has been added');
  }

}
