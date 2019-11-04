import { state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'richie-revealer',
  templateUrl: './richie-revealer.component.html',
  styleUrls: ['./richie-revealer.component.scss'],
  animations: [
    trigger('wrapper', [
      state('wrapperClosed', style({ 'max-height': '0px' })),
      state('wrapperOpen', style({ 'max-height': '600px' })),
      transition('wrapperOpen <=> wrapperClosed', [])
    ]),
    trigger('iconStyle', [
      state(
        'iconOpen',
        style({
          transform: 'rotate(90deg) translate(-150%, -50%)'
        })
      ),
      state(
        'iconClosed',
        style({
          transform: 'rotate(0deg) translate(0, 0)'
        })
      ),
      transition('iconOpen <=> iconClosed', [])
    ])
  ]
})
export class RichieRevealerComponent {
  @Input() heading: string;
  @Input() amount: number;
  @Input() margin: number;

  wrapper: boolean = false;
  iconStyle: boolean = false;

  toggleReveal(state: boolean): void {
    this.wrapper = !state;
    this.iconStyle = !state;
    this.wrapper = !state;
    this.iconStyle = !state;
  }
}
