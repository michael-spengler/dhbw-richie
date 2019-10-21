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
  @Output() cancel = new EventEmitter<Event>();
  @Output() submit = new EventEmitter<Event>();

  submitClick(event?) {
    this.submit.emit(event);
  }

  cancelClick(event?) {
    this.cancel.emit(event);
  }

  autoGrowTextZone(e) {
    e.target.style.height = '20px';
    e.target.style.height = e.target.scrollHeight - 4 + 'px';
  }

  private innerValue: any = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
