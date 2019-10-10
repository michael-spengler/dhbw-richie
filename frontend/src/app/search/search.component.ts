import { Component } from '@angular/core';
import { Globals, NotificationType } from '../globals';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(public globals: Globals) {
    for (let i = 0; i < 14; i++) {
      this.results.push({
        id: 82938290839,
        question:
          '1 mod x = 2 dawjdiwjadwadijwaiodjwioadjwioajdiojadiojdiwaidjwaiodjwiaodjiwoajdwioajdwioajdwioajdijdijdiwjaid',
        answer:
          'Rel. ez. 1+1 = 2 dawjdiwjadwadijwaiodjwioadjwioajdiojadiojdiwaidjwaiodjwiaodjiwoajdwioajdwioajdwioajdijdijdiwjaiddawjdiwjadwadijwaiodjwioadjwioajdiojadiojdiwaidjwaiodjwiaodjiwoajdwioajdwioajdwioajdijdijdiwjaiddawjdiwjadwadijwaiodjwioadjwioajdiojadiojdiwaidjwaiodjwiaodjiwoajdwioajdwioajdwioajdijdijdiwjaid'
      });
    }
    this.startSearch();
  }

  selectionStyle: any = { opacity: 0.7 };
  formData = ['', '', '', ''];
  lectures = [
    'Einführung IT',
    'Logik & Algebra',
    'Finanzmathe',
    'Programmieren I',
    'Programmieren II',
    'Bilanzierung',
    'Vertrags-Recht',
    'Was auch immer',
    'soll mir das',
    'Backend schicken'
  ];

  searchQuery = '';
  results = [];

  resultsWrapper = {
    'max-height': '0px',
    'overflow': 'hidden'
  };
  landingWrapperStyle = {
    top: '50%'
  };
  landingStyle = {
    'min-height': '100vh'
  };
  isSearching = false;

  setLecture(lecture: string): void {
    this.formData[3] = lecture;
    this.hideSelection();
  }

  toggleSelection() {
    if (this.selectionStyle.opacity === 1) {
      this.hideSelection();
    } else {
      this.selectionStyle.opacity = 1;
      this.selectionStyle.transform = 'scale(1)';
    }
  }

  hideSelection() {
    this.selectionStyle.opacity = 0;
    this.selectionStyle.transform = 'scale(0)';
  }

  onClick(event) {
    event.stopPropagation();
  }

  onInputKeyDown(event) {
    if (event.key == 'Enter') this.startSearch();
  }

  startSearch() {
    if (this.isSearching) return;
    this.isSearching = true;

    setTimeout(() => {
      this.globals.sendNotification(
        `Die Suche ergab folgende Treffer`,
        NotificationType.SUCCESS
      );
      this.landingStyle['min-height'] = '268.667px';
      this.landingWrapperStyle.top = '144.334px';
      this.resultsWrapper['max-height'] = 'unset';
      this.isSearching = false;
    }, 1500 / 1500);
  }
}
