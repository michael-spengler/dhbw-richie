import { Component, Input } from '@angular/core';

@Component({
  selector: 'richie-revealer',
  templateUrl: './richie-revealer.component.html',
  styleUrls: ['./richie-revealer.component.scss']
})
export class RichieRevealerComponent {
  @Input() heading: string;
  @Input() amount: string;
  @Input() margin: number;

  wrapper: any = { 'max-height': '0px' };
  iconStyle: any = { transform: `rotate(0deg)` };

  toggleReveal(): void {
    if (this.wrapper['max-height'] === '0px') {
      this.wrapper['max-height'] = '600px';
      this.iconStyle.transform = 'rotate(90deg) translate(-150%, -50%)';
    } else {
      this.wrapper['max-height'] = '0px';
      this.iconStyle.transform = 'rotate(0deg) translate(0, 0)';
    }
  }
}
