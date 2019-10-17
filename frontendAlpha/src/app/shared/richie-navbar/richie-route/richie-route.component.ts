import { Component, Input } from '@angular/core';

@Component({
  selector: 'richie-route',
  template: `
    <a ngIf*="displayIf" routerLink="link" routerLinkActive="active">
      <i class="icon"></i>
      <div class="name">{{ name }}</div>
      <div *ngIf="status" class="type">{{ status }}</div>
    </a>
  `,
  styleUrls: ['./richie-route.component.scss']
})
export class RichieRouteComponent {
  @Input() icon: string;
  @Input() name: string;
  @Input() status: string;
  @Input() link: string;
  @Input() displayIf: boolean;
}
