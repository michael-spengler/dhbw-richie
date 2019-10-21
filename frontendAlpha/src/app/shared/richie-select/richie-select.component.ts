import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'richie-select',
  templateUrl: './richie-select.component.html',
  styleUrls: ['./richie-select.component.scss']
})
export class RichieSelectComponent {
  @Input() heading: string = 'Wähle...';
  @Input() items: string[] = [];
  @Input() currentItem: string;
  @Input() tabindex: number;
  @Input() placeholder: string = 'Bitte wähle...';
  @Output() change = new EventEmitter();

  selectionClass: string = 'hideSelect';
  selectionStyle: any = { display: 'none' };

  onClick(event) {
    event.stopPropagation();
  }

  toggleSelection() {
    this.selectionStyle = { display: 'block' };
    this.selectionClass === 'showSelect'
      ? this.hideSelection()
      : (this.selectionClass = 'showSelect');
  }

  hideSelection() {
    this.selectionClass = 'hideSelect';
  }

  selectionHasChanged(toItem: number) {
    this.hideSelection();
    this.currentItem = this.items[toItem];
    this.change.emit(this.currentItem);
  }
}
