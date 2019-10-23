import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'richie-stats',
  templateUrl: './richie-stats.component.html',
  styleUrls: ['./richie-stats.component.scss']
})
export class RichieStatsComponent {
  constructor(public domSanitizer: DomSanitizer) {}

  @Input() text: string;
  @Input() amount: any;
  @Input() icon: string;
}
