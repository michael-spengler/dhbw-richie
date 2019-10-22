import { EventEmitter, Inject, Injectable, InjectionToken } from '@angular/core';

export const THEMES = new InjectionToken('THEMES');
export const ACTIVE_THEME = new InjectionToken('ACTIVE_THEME');

export interface Theme {
  name: string;
  properties: any;
}

export interface ThemeOptions {
  themes: Theme[];
  active: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themeChange = new EventEmitter<Theme>();

  constructor(
    @Inject(THEMES) public themes: Theme[],
    @Inject(ACTIVE_THEME) public theme: string
  ) {}

  getActiveTheme(): Theme {
    const theme = this.themes.find(t => t.name === this.theme);
    if (!theme) {
      throw new Error(`Theme not found: '${this.theme}'`);
    }
    return theme;
  }

  setTheme(name: string): void {
    this.theme = name;
    this.themeChange.emit(this.getActiveTheme());
  }

  toggleTheme(): void {
    this.theme == 'light' ? this.setTheme('dark') : this.setTheme('light');
  }
}
