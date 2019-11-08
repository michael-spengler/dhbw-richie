import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html'
})
export class LegalComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          const element = document.querySelector('#' + tree.fragment);
          if (element) {
            element.scrollIntoView(true);
          }
        }
      }
    });
  }
}
