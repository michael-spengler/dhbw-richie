import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-richie-textarea',
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
        <div (click)="cancel()" class="iconButton" red>
          <i class="fal fa-times"></i>Abbrechen
        </div>
        <div (click)="submit()" class="iconButton" green>
          <i class="fas fa-comment-alt"></i>Kommentieren
        </div>
      </div>
    </div>
  `,
  styles: ['./richie-textarea.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class RichieTextareaComponent {
  //Öffentlich kommentieren

  @Input() placeholder: string;
  @Input() hasActions: boolean;
  @Input() cancel: any;
  @Input() submit: any;

  autoGrowTextZone(e) {
    e.target.style.height = '23px';
    e.target.style.height = e.target.scrollHeight + 'px';
  }
}
