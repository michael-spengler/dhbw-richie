import { Component, Input } from '@angular/core';

@Component({
  selector: 'richie-route',
  template: `
    <a [routerLink]="'/' + link" routerLinkActive="active">
      <i [ngClass]="icon"></i>
      <div class="name">{{ name }}</div>
      <div *ngIf="status.length" class="type">{{ status }}</div>
    </a>
  `,
  styleUrls: ['./richie-route.component.scss']
})
export class RichieRouteComponent {
  @Input()
  icon: string;
  @Input()
  name: string;
  @Input()
  status: string = '';
  @Input()
  link: string;
}
