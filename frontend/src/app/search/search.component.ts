import { AfterViewInit, Component, HostListener } from '@angular/core';
import { Globals, NotificationType } from '../globals';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    setTimeout(() => {
      //this.startSearch();
    }, 20);
  }
  constructor(public globals: Globals) {
    for (let i = 0; i < 35; i++) {
      let question_addition = '';
      let answer_addition = '';
      for (let x = 0; x < Math.random() * 200; x++) {
        question_addition += Math.random()
          .toString(36)
          .substring(7);
      }
      for (let x = 0; x < Math.random() * 200; x++) {
        answer_addition += Math.random()
          .toString(36)
          .substring(7);
      }

      this.results.push({
        id: 82938290839,
        likes: 142,
        dislikes: 39,
        question: '1 mod x = 2' + question_addition,
        answer: 'Rel. ez. 1+1 = 2' + answer_addition
      });
    }
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
    'overflow': 'hidden',
    'display': 'none'
  };
  landingWrapperStyle = {
    top: '50%'
  };
  landingStyle = {
    'min-height': '100vh'
  };
  isSearching = false;
  searchResultElements = [];

  @HostListener('window:scroll', ['$event'])
  onScroll(event = null) {
    if (this.searchResultElements === null || this.searchResultElements.length == 0)
      return;

    this.searchResultElements.forEach(element => {
      let positionFromTop = element.getBoundingClientRect().top;
      let windowHeight = window.innerHeight;
      if (positionFromTop - windowHeight <= 0 && !element.classList.contains('come-in')) {
        element.classList.add('come-in');
      }
    });
    this.searchResultElements = this.searchResultElements.filter(
      element => !element.classList.contains('come-in')
    );
  }

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
      this.resultsWrapper.display = 'block';
      this.resultsWrapper['max-height'] = 'unset';
      this.isSearching = false;
      this.searchResultElements = Array.from(
        document.querySelectorAll('.questionanswer')
      ).slice(0);
      setTimeout(() => {
        this.onScroll();
      }, 700);
    }, 1500 * 1);
  }
}
