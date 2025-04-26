import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Theme, ThemeData } from './models/theme.enum';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private readonly currentThemeSubject = new BehaviorSubject<Theme | null>(null);
  private readonly themesDataSubject = new BehaviorSubject<ThemeData[]>(this.initializeThemesData());
  private readonly isColorsIndicatorVisible = new BehaviorSubject<boolean>(false);

  constructor() { }

  baseCharacter = {
    "name": { "value": "Luke Skywalker", "status": "" },
    "height": { "value": "172", "status": "" },
    "mass": { "value": "77", "status": "" },
    "gender": { "value": "Homme", "status": "" },
    "eye_color": { "value": "Bleu", "status": "" },
    "homeworld": { "value": "Tatooine", "status": "" },
    "films": { "value": ["IV", "V", "VI", "III"], "status": "" },
    "species": { "value": "Humain", "status": "" }
  }

  baseThemeData = {
    themeName: Theme.StarWars,
    winStreak: 0,
    done: false,
    success: false,
    headers: [],
    inputItems: [],
    items: [],
    guessedItems: [],
    logoSrc: "",
    targetItem: this.baseCharacter,
    maxGuessNumber: 7
  }

  // Public Observables
  readonly currentTheme$ = this.currentThemeSubject.asObservable();
  readonly themesDatas$ = this.themesDataSubject.asObservable();
  readonly isColorsIndicatorVisible$ = this.isColorsIndicatorVisible.asObservable();

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

  setColorsIndicatorVisibility(isVisible: boolean): void {
    this.isColorsIndicatorVisible.next(isVisible);
  }
  getCurrentThemeData(): ThemeData {
    const theme = this.currentThemeSubject.value;
    return this.themesDataSubject.value.find((d) => d.themeName === theme) ?? this.baseThemeData;
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
      headers: [],
      inputItems: [],
      items: [],
      guessedItems: [],
      logoSrc: "",
      targetItem: this.baseCharacter,
      maxGuessNumber: 7
    }));
  }

}
