import { Component, Input } from '@angular/core';

@Component({
  selector: 'richie-route-small',
  template: `
    <a [routerLink]="'/' + link">{{ name }}</a>
  `,
  styleUrls: ['./richie-route-small.component.scss']
})
export class RichieRouteSmallComponent {
  @Input() link: string;
  @Input() name: string;
}
