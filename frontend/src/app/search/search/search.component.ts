import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { NotificationType } from 'src/app/models/notificationTyp.enum';
import { IQuestion } from 'src/app/models/question.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { constants } from '../../shared/constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  constructor(
    public notificationService: NotificationService,
    public httpClient: HttpClient
  ) {
    this.constants = constants;
    this.showSearchbar();
  }

  constants: any;
  searchQuery = '';
  foundQuestions: IQuestion[] = [];
  isSearching: boolean = false;
  searchResultElements = [];
  resultsWrapper: any = { overflow: 'hidden' };
  landingStyle: any = {};
  quickLinksStyle: any = {};
  landingWrapperStyle: any = {};

  selectionChanged(filterNmbr, selection): void {
    console.log('Filter %i -> %s', filterNmbr, selection);
  }

  onInputKeyDown(event): void {
    if (event.key === 'Enter') this.startSearch();
  }

  startSearch(): void {
    if (this.isSearching) return;
    this.isSearching = true;
    this.showSearchbar();

    // TODO: ADD GET
    this.httpClient
      .get(
        'https://raw.githubusercontent.com/TimoScheuermann/cdn/master/DHBW%20Richie/foundQuestions.json'
      )
      .subscribe(
        data => {
          this.foundQuestions = [];
          JSON.parse(JSON.stringify(data)).forEach(question => {
            this.foundQuestions.push(question as IQuestion);
          });

          this.showResults();
          this.isSearching = false;
          this.notificationService.sendNotification(
            `Die Suche ergab folgende Treffer`,
            NotificationType.SUCCESS
          );

          setTimeout(() => {
            this.searchResultElements = Array.from(
              document.querySelectorAll('.resultWrapper')
            ).slice(0);
          }, 20);

          setTimeout(() => {
            this.onScroll();
          }, 700);
        },
        error => {
          console.log('Error => ', error);
        }
      );
  }

  showSearchbar(): void {
    this.quickLinksStyle = { 'max-height': '60px' };
    this.landingStyle['min-height'] = '100vh';
    this.landingStyle['margin-bottom'] = '0px';
    this.landingWrapperStyle.top = '50%';
    this.resultsWrapper.display = 'none';
    this.resultsWrapper['max-height'] = '0px';
  }

  showResults(): void {
    this.quickLinksStyle = { 'max-height': '0px' };
    this.landingStyle['min-height'] = '268.667px';
    this.landingStyle['margin-bottom'] = '-50px';
    this.landingWrapperStyle.top = '124.334px';
    this.resultsWrapper.display = 'block';
    this.resultsWrapper['max-height'] = 'unset';
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event = null): void {
    if (this.searchResultElements === null || this.searchResultElements.length == 0) {
      console.log('iwie leer...');
      return;
    }

    this.searchResultElements.forEach(element => {
      let positionFromTop = element.getBoundingClientRect().top;
      let windowHeight = window.innerHeight;
      if (positionFromTop - windowHeight <= 0 && !element.classList.contains('come-in')) {
        element.classList.remove('resultWrapper');
        element.classList.add('come-in');
      }
    });
    this.searchResultElements = this.searchResultElements.filter(
      element => !element.classList.contains('come-in')
    );
  }
}
