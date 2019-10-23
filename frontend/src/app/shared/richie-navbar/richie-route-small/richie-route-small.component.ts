import { Component, Input } from '@angular/core';

@Component({
  selector: 'richie-route-small',
  templateUrl: './richie-route-small.component.html',
  styleUrls: ['./richie-route-small.component.scss']
})
export class RichieRouteSmallComponent {
  @Input() link: string;
  @Input() name: string;
}
