import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RichieTextareaComponent),
  multi: true
};
const noop = () => {};
@Component({
  selector: 'richie-textarea',
  templateUrl: './richie-textarea.component.html',
  styleUrls: ['./richie-textarea.component.scss']
})
export class RichieTextareaComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @Input() hasActions: boolean;
  @Output() textChange = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<Event>();
  @Output() submit = new EventEmitter<Event>();

  //The internal data model
  private innerValue: any = '';

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  submitClick(event?) {
    this.submit.emit(event);
  }

  cancelClick(event?) {
    this.cancel.emit(event);
  }

  autoGrowTextZone(e) {
    e.target.style.height = '23px';
    e.target.style.height = e.target.scrollHeight + 'px';
  }
}
