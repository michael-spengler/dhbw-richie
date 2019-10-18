import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'richie-textarea',
  template: `
    <div class="writeComment">
      <textarea
        (keyup)="autoGrowTextZone($event)"
        placeholder="{{ placeholder }}"
        rows="1"
        required
      ></textarea>
      <span></span>
      <div *ngIf="hasActions" class="actions">
        <div (click)="cancelClick($event)" class="iconButton" red>
          <i class="fal fa-times"></i>Abbrechen
        </div>
        <div (click)="submitClick($event)" class="iconButton" green>
          <i class="fas fa-comment-alt"></i>Kommentieren
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./richie-textarea.component.css']
})
export class RichieTextareaComponent {
  @Input() placeholder: string;
  @Input() hasActions: boolean;
  @Output() t_cancel = new EventEmitter<Event>();
  @Output() t_submit = new EventEmitter<Event>();

  submitClick(event?) {
    this.t_submit.emit(event);
  }

  cancelClick(event?) {
    this.t_cancel.emit(event);
  }

  autoGrowTextZone(e) {
    e.target.style.height = '23px';
    e.target.style.height = e.target.scrollHeight + 'px';
  }
}
