import {
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { GameService } from '../../services/game.service';
import { GuessResultComponent } from '../guess-result/guess-result.component';
import { GuessInputComponent } from '../guess-input/guess-input.component';
import { Character } from '../../models/swCharacter.model';
import { Theme } from '../../models/theme.enum';
import { ColorIndicatorComponent } from '../../color-indicator/color-indicator.component';
import { CommonModule } from '@angular/common';
import { GlobalStateService } from '../../global-state.service';
import { Subject, takeUntil } from 'rxjs';
import { GameLogicService } from '../../services/game-logic.service';

@Component({
  selector: 'app-guess-container',
  imports: [
    CommonModule,
    GuessInputComponent,
    GuessResultComponent,
    ColorIndicatorComponent,
  ],
  templateUrl: './guess-container.component.html',
  styleUrl: './guess-container.component.scss',
  standalone: true,
})
export class GuessContainerComponent {
  headers: any[] = [];
  target!: Character;
  theme!: Theme;
  @Output() onThemeComplete = new EventEmitter<boolean>();

  allCharacters: Character[] = [];
  guessedCharacters: Character[] = [];
  maxGuessNumber: number = 1;
  inputOptions: string[] = [];
  found: boolean = false;
  logoSrc: string = '';
  colorsIndicatorVisible: boolean = false;

  constructor(private gameService: GameService, private globalStateService: GlobalStateService, private gameLogicService: GameLogicService) { }

  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.globalStateService.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: Theme | null) => {
        if (theme) {
          this.theme = theme;
          this.initGameData();
        }
      });
  }

  reset(): void {
    this.guessedCharacters = [];
    this.inputOptions = [];
    this.found = false;
    this.colorsIndicatorVisible = false;
  }

  initGameData(): void {
    this.gameService.getGameData(this.theme).subscribe((data) => {
      if (data) {
        this.headers = data.headers;
        this.allCharacters = data.characters;
        this.inputOptions = data.characters.map((character: Character) => {
          return character.name.value;
        });
        const randomNumber = Math.floor(
          Math.random() * (this.allCharacters.length + 1)
        );
        this.target = this.allCharacters[randomNumber];
        this.logoSrc = `assets/images/${this.theme}_logo.webp`;
      }
    });
  }

  handleGuess(guess: string) {
    const guessedCharacter: Character | undefined = this.allCharacters.find(
      (character: Character) => character.name.value === guess
    );
    if (!guessedCharacter) {
      return;
    }

    const updatedCharacter = this.gameLogicService.addStatusToCharacter(
      guessedCharacter,
      this.target
    );

    if (updatedCharacter) {
      this.guessedCharacters.unshift(updatedCharacter);

      if (this.guessedCharacters.length == 1)
        this.colorsIndicatorVisible = true;

      this.inputOptions = this.inputOptions.filter(
        (option: string) => option !== updatedCharacter.name.value
      );
    }

    this.checkGuessResult(guess);
  }

  checkGuessResult(guess: string): void {
    if (this.target.name.value === guess) {
      setTimeout(() => {
        this.found = true;
        window.ConfettiManager.triggerConfetti();
        this.globalStateService.updateCurrentThemeData({
          done: true,
          success: true
        });

        this.reset();
      }, 2000);
    }

    if (this.guessedCharacters.length >= this.maxGuessNumber) {
      setTimeout(() => {
        this.globalStateService.updateCurrentThemeData({
          done: true,
          success: true
        });
        this.reset();
      }, 2000);
    }
  }

  handleCrossClick(clicked: boolean): void {
    this.colorsIndicatorVisible = clicked;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
