import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Theme, ThemeData } from './models/theme.enum';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private readonly currentThemeSubject = new BehaviorSubject<Theme | null>(null);
  private readonly themesDataSubject = new BehaviorSubject<ThemeData[]>(this.initializeThemesData());

  constructor() {}

  // Public Observables
  readonly currentTheme$ = this.currentThemeSubject.asObservable();
  readonly themesDatas$ = this.themesDataSubject.asObservable();

  readonly currentThemeData$: Observable<ThemeData | undefined> = combineLatest([
    this.currentTheme$,
    this.themesDatas$,
  ]).pipe(
    map(([currentTheme, themesData]) =>
      currentTheme ? themesData.find((d) => d.themeName === currentTheme) : undefined
    )
  );

  // Public Methods
  setTheme(theme: Theme | null): void {
    this.currentThemeSubject.next(theme);
  }

  getCurrentThemeData(): ThemeData | undefined {
    const theme = this.currentThemeSubject.value;
    return theme ? this.themesDataSubject.value.find((d) => d.themeName === theme) : undefined;
  }

  updateCurrentThemeData(updatedFields: Partial<ThemeData>): void {
    const currentTheme = this.currentThemeSubject.value;
    if (!currentTheme) return;

    const updated = this.themesDataSubject.value.map((data) =>
      data.themeName === currentTheme ? { ...data, ...updatedFields } : data
    );

    this.themesDataSubject.next(updated);
  }

  // Private Methods
  private initializeThemesData(): ThemeData[] {
    return Object.values(Theme).map((themeName) => ({
      themeName,
      winStreak: 0,
      done: false,
      success: false,
    }));
  }
}
