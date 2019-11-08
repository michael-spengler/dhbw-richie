import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'richie-question',
  templateUrl: './richie-question.component.html',
  styleUrls: ['./richie-question.component.scss']
})
export class RichieQuestionComponent {
  @Input() question: Question;
  @Output() likeOrDislike = new EventEmitter<{
    action: 'like' | 'dislike';
    question: Question;
  }>();

  handleAction(action: 'like' | 'dislike') {
    this.likeOrDislike.emit({
      action,
      question: this.question
    });
  }
}
