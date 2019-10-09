import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  constructor(public route: ActivatedRoute) {
    route.params.subscribe(params => console.log(params));
  }
}
