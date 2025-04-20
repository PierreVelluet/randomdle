import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { GameService } from '../../services/game.service';
import { GuessResultComponent } from '../guess-result/guess-result.component';
import { GuessInputComponent } from '../guess-input/guess-input.component';
import { Character } from '../../models/swCharacter.model';
import { Theme } from '../../models/theme.enum';
import { ColorIndicatorComponent } from '../../color-indicator/color-indicator.component';
import { CommonModule } from '@angular/common';

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
  @Input() theme: Theme | null = null;
  @Output() onThemeComplete = new EventEmitter<boolean>();

  allCharacters: Character[] = [];
  guessedCharacters: Character[] = [];
  maxGuessNumber: number = 1;
  inputOptions: string[] = [];
  found: boolean = false;
  logoSrc: string = '';
  colorsIndicatorVisible: boolean = false;

  constructor(private gameService: GameService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['theme'] && this.theme) {
      this.initGameData();
    }
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

    const updatedCharacter = this.addStatusToCharacter(
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

    if (this.target.name.value === guess) {
      this.found = true;
      setTimeout(() => {
        window.ConfettiManager.triggerConfetti();
      }, 3000);
      setTimeout(() => {
        this.onThemeComplete.emit(true);
      }, 4000);
    }

    if (this.guessedCharacters.length >= this.maxGuessNumber) {
      setTimeout(() => {
        this.onThemeComplete.emit(false);
      }, 3000);
    }
  }

  addStatusToCharacter(
    guessedCharacter: Character,
    target: Character
  ): Character {
    const updatedCharacter: Character = { ...guessedCharacter };

    for (const key in guessedCharacter) {
      if (guessedCharacter.hasOwnProperty(key)) {
        const guessedValue = guessedCharacter[key].value;
        const targetValue = target[key].value;

        let status: string = 'incorrect';

        if (guessedValue === targetValue) {
          status = 'correct';
        } else if (
          parseFloat(guessedValue as string) > parseFloat(targetValue as string)
        ) {
          status = 'greater';
        } else if (
          parseFloat(guessedValue as string) < parseFloat(targetValue as string)
        ) {
          status = 'smaller';
        }

        if (key === 'films') {
          const guessedFilms = guessedCharacter[key].value || [];
          const targetFilms = target[key].value || [];

          const filmsMatch = guessedFilms.every((film) =>
            targetFilms.includes(film)
          );

          if (filmsMatch) {
            status = 'correct';
          } else {
            const filmsPartialMatch = guessedFilms.some((film) =>
              targetFilms.includes(film)
            );
            if (filmsPartialMatch) {
              status = 'proche';
            }
          }
        }

        updatedCharacter[key].status = status;
      }
    }

    return updatedCharacter;
  }

  handleCrossClick(clicked: boolean): void {
    this.colorsIndicatorVisible = clicked;
  }
}
