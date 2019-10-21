import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'richie-iconbutton',
  templateUrl: './richie-iconbutton.component.html',
  styleUrls: ['./richie-iconbutton.component.scss']
})
export class RichieIconbuttonComponent {
  @Input() url: string;
  @Input() icon: string;
  @Input() text: string;
  @Output() action = new EventEmitter<Event>();

  actionCalled(event?) {
    this.action.emit(event);
  }
}
