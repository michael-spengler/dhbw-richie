import { Component, Input } from '@angular/core';
import { IQuestion } from 'src/app/models/question.model';

@Component({
  selector: 'richie-question',
  templateUrl: './richie-question.component.html',
  styleUrls: ['./richie-question.component.scss']
})
export class RichieQuestionComponent {
  @Input() question: IQuestion;
}
