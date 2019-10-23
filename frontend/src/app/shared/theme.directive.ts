import { Directive, ElementRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Theme, ThemeService } from './theme.service';

@Directive({
  selector: '[app-theme]'
})
export class ThemeDirective implements OnInit {
  constructor(private _elementRef: ElementRef, private _themeService: ThemeService) {}

  private unsubscribe = new Subject();

  ngOnInit(): void {
    const active = this._themeService.getActiveTheme();
    if (active) {
      this.updateTheme(active);
    }
    this._themeService.themeChange
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((theme: Theme) => this.updateTheme(theme));
  }

  updateTheme(theme: Theme): void {
    for (const key in theme.properties) {
      this._elementRef.nativeElement
        .closest('body')
        .style.setProperty(key, theme.properties[key]);
    }
  }
}
