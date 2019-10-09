import { Component } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public globals: Globals) {}

  openURL(url: string) {
    window.open(url, '_blank');
  }
}
