import { state, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, skipWhile } from 'rxjs/operators';
import { NotificationType } from 'src/app/models/notificationTyp.enum';
import { Question } from 'src/app/models/question.model';
import { NotificationService } from 'src/app/shared/notification.service';
import { QuestionService } from '../../question/question.service';
import { constants } from '../../shared/constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('quickLinks', [
      state('linksOpen', style({ 'max-height': '60px' })),
      state('linksClose', style({ 'max-height': '0px' })),
      transition('linksOpen <=> linksClose', [])
    ]),
    trigger('landingStyle', [
      state(
        'landingOpen',
        style({
          'min-height': '100vh',
          'margin-bottom': '0px'
        })
      ),
      state(
        'landingClose',
        style({
          'min-height': '268.667px',
          'margin-bottom': '-50px'
        })
      ),
      transition('landingOpen <=> landingClose', [])
    ]),
    trigger('landingWrapper', [
      state('landingWrapperOpen', style({ top: '50%' })),
      state('landingWrapperClose', style({ top: '124.334px' })),
      transition('landingWrapperOpen <=> landingWrapperClose', [])
    ]),
    trigger('resultsWrapper', [
      state(
        'resultsWrapperOpen',
        style({
          'display': 'none',
          'max-height': '0px'
        })
      ),
      state(
        'resultsWrapperClose',
        style({
          'display': 'block',
          'max-height': 'unset'
        })
      ),
      transition('resultsWrapperOpen <=> resultsWrapperClose', [])
    ])
  ]
})
export class SearchComponent implements AfterViewInit, OnInit {
  constructor(
    public notificationService: NotificationService,
    public questionService: QuestionService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.constants = constants;
  }

  @ViewChildren('qs')
  qElements: QueryList<ElementRef<HTMLDivElement>>;

  // Animation trigger / Style Flags
  quickLinks: boolean = true;
  landing: boolean = true;
  landingWrapper: boolean = true;
  resultsWrapper: boolean = true;

  constants: any;
  searchQuery: string = '';
  foundQuestions: Question[] = [];
  isSearching: boolean = false;

  selectionChanged(filterNmbr: number, selection: string): void {
    console.log('Filter %i -> %s', filterNmbr, selection);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.q) {
        this.searchQuery = params.q;
        this.startSearch();
      }
    });
  }

  ngAfterViewInit() {
    this.qElements.changes
      .pipe(
        skipWhile(v => !v.length),
        delay(700)
      )
      .subscribe(() => this.onScroll());
  }

  onInputKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.startSearch();
  }

  startSearch(): void {
    if (this.isSearching) return;
    this.isSearching = true;
    this.toggleStyles(true);
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: {
        q: this.searchQuery
      },
      queryParamsHandling: 'merge'
    });
    this.questionService.searchForKeyword(this.searchQuery).subscribe(q => {
      if (!q.length) {
        this.notificationService.sendNotification(
          'Es konnten leider keiner Suchergebnisse gefunden werden',
          NotificationType.ERROR
        );
        this.isSearching = false;
        return;
      }
      this.foundQuestions = q;
      this.toggleStyles(false);
      this.isSearching = false;
      this.notificationService.sendNotification(
        `Die Suche ergab folgende Treffer`,
        NotificationType.SUCCESS
      );
    });
  }

  toggleStyles(toggle: boolean): void {
    this.quickLinks = toggle;
    this.landing = toggle;
    this.landingWrapper = toggle;
    this.resultsWrapper = toggle;
  }

  async likeOrDislike(
    {
      action,
      question
    }: {
      action: 'like' | 'dislike';
      question: Question;
    },
    index: number
  ) {
    this.foundQuestions[index] = await this.questionService.likeOrDislikeQuestion(
      question.id,
      action
    );
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.qElements || !this.qElements.length) {
      return;
    }
    this.qElements.forEach(e => {
      const element = e.nativeElement;
      const positionFromTop = element.getBoundingClientRect().top;
      if (
        positionFromTop - window.innerHeight <= 0 &&
        !element.classList.contains('come-in')
      ) {
        element.classList.remove('resultWrapper');
        element.classList.add('come-in');
      }
    });
  }
}
