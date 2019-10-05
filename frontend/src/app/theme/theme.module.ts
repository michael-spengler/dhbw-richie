import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { ACTIVE_THEME, ThemeOptions, THEMES } from "./theme";
import { ThemeDirective } from "./theme.directive";
import { ThemeService } from "./theme.service";

@NgModule({
  imports: [CommonModule],
  providers: [ThemeService],
  declarations: [ThemeDirective],
  exports: [ThemeDirective]
})
export class ThemeModule {
  static forRoot(options: ThemeOptions): ModuleWithProviders {
    return {
      ngModule: ThemeModule,
      providers: [
        {
          provide: THEMES,
          useValue: options.themes
        },
        {
          provide: ACTIVE_THEME,
          useValue: options.active
        }
      ]
    };
  }
}
