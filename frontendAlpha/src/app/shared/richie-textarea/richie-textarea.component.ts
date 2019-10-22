import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RichieTextareaComponent),
  multi: true
};

@Component({
  selector: 'richie-textarea',
  templateUrl: './richie-textarea.component.html',
  styleUrls: ['./richie-textarea.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class RichieTextareaComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @Input() hasActions: boolean;
  @Input() tabindex: number;
  @Output() cancel = new EventEmitter<Event>();
  @Output() submit = new EventEmitter<Event>();

  private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  submitClick(event?): void {
    this.submit.emit(event);
  }

  cancelClick(event?): void {
    this.cancel.emit(event);
  }

  autoGrowTextZone(e): void {
    e.target.style.height = '20px';
    e.target.style.height = e.target.scrollHeight - 4 + 'px';
  }

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur(): void {
    this.onTouchedCallback();
  }

  writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
}
