import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'richie-comment',
  template: `
    <p>
      comment works!
    </p>
  `,
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
