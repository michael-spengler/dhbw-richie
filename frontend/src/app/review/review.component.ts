import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals, NotificationType } from '../globals';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css', '../add/add.component.css']
})
export class ReviewComponent implements OnInit {
  myItems: any[]; //just for testing purposes
  selectionStyle: any = { opacity: 0.7 };
  lectures = [
    'Einführung IT',
    'Logik & Algebra',
    'Finanzmathe',
    'Programmieren I',
    'Programmieren II',
    'Bilanzierung',
    'Vertrags-Recht',
    'Was auch immer',
    'soll mir das',
    'Backend schicken'
  ];

  ngOnInit() {}

  constructor(private globals: Globals, private router: Router) {
    if (!(globals.user.isAdmin || globals.user.isReviewer)) {
      router.navigate(['/404']);
    }

    this.myItems = [
      {
        status: 'Neu',
        question: 'Was ist der Sinn des Lebens',
        answer: 42,
        source: 'Vorlesung',
        lecture: this.lectures[0]
      },
      {
        status: 'Änderung',
        question: 'Warum ist die Banane krumm',
        answer: 'Sonne',
        source: 'Internet',
        lecture: this.lectures[1]
      },
      {
        status: 'Feedback',
        question: 'Wie viele Sandkörner gibt es am Strand',
        answer: 42000,
        source: 'Mündlich',
        lecture: this.lectures[2]
      },
      {
        status: 'Löschen',
        question: 'Was ist der Sinn des Lebens',
        answer: 42,
        source: 'Slides',
        lecture: this.lectures[3]
      }
    ];
  }

  formData = ['', '', '', ''];
  selectionClass = 'hideSelect';

  setLecture(lecture: string): void {
    this.lectureInput = lecture;
    this.hideSelection();
  }

  toggleSelection() {
    if (this.selectionClass === 'showSelect') {
      this.hideSelection();
    } else {
      this.selectionClass = 'showSelect';
    }
  }

  hideSelection() {
    this.selectionClass = 'hideSelect';
  }

  public display = { display: 'none' };

  public togglePopUp(item: any) {
    this.display = {
      display: this.display.display == 'none' ? 'block' : 'none'
    };
    if (item && item != null) {
      this.formData = [item.question, item.answer, item.source, item.lecture];
    }
  }

  onClick(event) {
    event.stopPropagation();
  }

  closeModal() {
    this.display = { display: 'none' };
  }

  // Q&A Inputfields
  questionInput;
  answerInput;
  sourceInput;

  // Dropdown
  lectureInput;
  lectureOutput;

  acceptQuestion() {
    this.globals.sendNotification('Frage wurde eingetragen', NotificationType.SUCCESS);
    this.initInputs();
  }
  deleteQuestion() {
    this.globals.sendNotification('Frage wurde gelöscht', NotificationType.ERROR);
    this.initInputs();
  }

  initInputs() {
    this.display.display = 'none';
    this.questionInput = '';
    this.lectureInput = '';
    this.sourceInput = '';
    this.answerInput = '';
  }
}
