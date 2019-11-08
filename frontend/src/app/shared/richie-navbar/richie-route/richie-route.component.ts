import { Component, Input } from '@angular/core';

@Component({
  selector: 'richie-route',
  templateUrl: './richie-route.component.html',
  styleUrls: ['./richie-route.component.scss']
})
export class RichieRouteComponent {
  @Input() icon: string;
  @Input() name: string;
  @Input() status: string = '';
  @Input() link: string;
}
