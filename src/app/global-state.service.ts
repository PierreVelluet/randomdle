import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { GameState, Theme, ThemeData } from './models/theme.enum';
import { GameService } from './services/game.service';
import { Character } from './models/swCharacter.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalStateService {
  private readonly currentThemeSubject = new BehaviorSubject<Theme | null>(null);
  private readonly themesDataSubject = new BehaviorSubject<ThemeData[]>([]);
  private readonly isColorsIndicatorVisible = new BehaviorSubject<boolean>(false);
  private readonly isHidingThemes = new BehaviorSubject<boolean>(false);

  constructor(private gameService: GameService) {
    this.loadGameDataFromLocalStorage();
  }

  baseCharacter = {
    "name": { "value": "Luke Skywalker", "status": "" },
    "height": { "value": "172", "status": "" },
    "mass": { "value": "77", "status": "" },
    "gender": { "value": "Homme", "status": "" },
    "eye_color": { "value": "Bleu", "status": "" },
    "homeworld": { "value": "Tatooine", "status": "" },
    "films": { "value": ["IV", "V", "VI", "III"], "status": "" },
    "species": { "value": "Humain", "status": "" }
  };

  baseThemeData = {
    themeName: Theme.StarWars,
    winStreak: 0,
    gameState: GameState.IN_PROGRESS,
    success: false,
    headers: [],
    inputItems: [],
    items: [],
    guessedItems: [],
    logoSrc: "",
    targetItem: this.baseCharacter,
    pastTargetItems: [],
    maxGuessNumber: 7,
    date: ""
  };

  // Public Observables
  readonly currentTheme$ = this.currentThemeSubject.asObservable();
  readonly themesDatas$ = this.themesDataSubject.asObservable();
  readonly isColorsIndicatorVisible$ = this.isColorsIndicatorVisible.asObservable();
  readonly isHidingThemes$ = this.isHidingThemes.asObservable();

  readonly currentThemeData$: Observable<ThemeData | undefined> = combineLatest([
    this.currentTheme$,
    this.themesDatas$
  ]).pipe(
    map(([currentTheme, themesData]) =>
      currentTheme ? themesData.find((d) => d.themeName === currentTheme) : undefined
    )
  );

  // Public Methods
  setTheme(theme: Theme | null): void {
    this.currentThemeSubject.next(theme);
  }

  setIsHidingTheme(isHinding: boolean): void {
    this.isHidingThemes.next(isHinding);
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
      data.themeName === currentTheme ? { ...data, ...updatedFields, date: this.getCurrentDate() } : data
    );

    this.themesDataSubject.next(updated);
    this.saveThemesDataToLocalStorage(updated);
  }

  // Private Methods
  private initializeThemeData(themeName: Theme): ThemeData {
    return {
      themeName,
      winStreak: 0,
      gameState: GameState.IN_PROGRESS,
      headers: [],
      inputItems: [],
      items: [],
      guessedItems: [],
      logoSrc: "",
      targetItem: this.baseCharacter,
      pastTargetItems: [],
      maxGuessNumber: 2,
      date: this.getCurrentDate()
    };
  }


  private loadGameDataFromLocalStorage(): void {
    const storedData = localStorage.getItem('themesData');

    if (storedData) {
      const gameData: ThemeData[] = JSON.parse(storedData);
      const today = this.getCurrentDate();

      const updatedData = gameData.map(themeData => {
        if (themeData.date == today) {
          // If the date is different, reset the game state for this theme
          return { ...this.initializeThemeData(themeData.themeName), date: today, pastTargetItems: themeData.pastTargetItems, winStreak: themeData.winStreak };
        }
        return themeData;
      });

      // Update the theme data subject with the possibly updated data
      this.themesDataSubject.next(updatedData);
    } else {
      // No data in localStorage, initialize with default data for all themes
      const defaultThemesData = Object.values(Theme).map((themeName) => this.initializeThemeData(themeName));
      this.themesDataSubject.next(defaultThemesData);
    }
  }

  // Ensure a new character is selected when the date changes
  initGameData(): void {
    this.gameService
      .getGameData(this.getCurrentThemeData().themeName)
      .subscribe((data) => {
        if (data) {
          // Step 1: Check if all characters have been used
          if (this.getCurrentThemeData().pastTargetItems.length === data.characters.length) {
            // If all characters have been used, reset the pastTargetItems
            this.updateCurrentThemeData({ pastTargetItems: [] });
          }

          // Step 2: Filter available characters based on past selections
          const availableCharacters: Character[] = data.characters.filter(
            (character: Character) => !this.getCurrentThemeData().pastTargetItems.includes(character)
          );

          // Step 3: Ensure there are available characters left
          if (availableCharacters.length > 0) {
            // Step 4: Pick a random character from the available characters
            const randomNumber = Math.floor(Math.random() * availableCharacters.length);
            const selectedCharacter = availableCharacters[randomNumber];

            // Step 5: Update the state with the new selected character
            this.updateCurrentThemeData({
              headers: data.headers,
              items: data.characters,
              inputItems: data.characters.map((character: Character) => character.name.value),
              logoSrc: `assets/images/${this.getCurrentThemeData().themeName}_logo.webp`,
              targetItem: selectedCharacter,
            });

            // Step 6: Add the selected character to pastTargetItems to exclude it in future rounds
            this.updateCurrentThemeData({
              pastTargetItems: [...this.getCurrentThemeData().pastTargetItems, selectedCharacter],
            });
          } else {
            console.log('No available characters left to select!');
          }
        }
      });
  }

  private saveThemesDataToLocalStorage(themesData: ThemeData[]): void {
    try {
      localStorage.setItem('themesData', JSON.stringify(themesData));
    } catch (e) {
      console.error('Failed to save themes data to localStorage:', e);
    }
  }

  private getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD
  }
}
