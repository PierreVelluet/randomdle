import { Component, Input } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GuessResultComponent } from '../guess-result/guess-result.component';
import { GuessInputComponent } from '../guess-input/guess-input.component';
import { Character } from '../../models/swCharacter.model';
import { Univers } from '../../models/univers.enum';

@Component({
  selector: 'app-guess-container',
  imports: [GuessInputComponent, GuessResultComponent],
  templateUrl: './guess-container.component.html',
  styleUrl: './guess-container.component.scss',
  standalone: true
})
export class GuessContainerComponent {
  headers: any[] = [];
  target!: Character;
  @Input() univer: Univers | null = null;

  allCharacters: Character[] = [];
  guessedCharacters: Character[] = [];
  inputOptions: string[] = [];
  found: boolean = false;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGameData(this.univer).subscribe((data) => {
      if (data) {
        this.headers = data.headers;
        this.allCharacters = data.characters;
        this.inputOptions = data.characters.map((character: Character) => {
          return character.name.value
        })
        const randomNumber = Math.floor(Math.random() * (this.allCharacters.length + 1));
        this.target = this.allCharacters[randomNumber];
      }
    });
  }

  handleGuess(guess: string) {
    const guessedCharacter: Character | undefined = this.allCharacters.find((character: Character) => character.name.value === guess);
    if (!guessedCharacter) {
      return;
    }

    const updatedCharacter = this.addStatusToCharacter(guessedCharacter, this.target);

    if (updatedCharacter) {
      this.guessedCharacters.unshift(updatedCharacter);
      this.inputOptions = this.inputOptions.filter((option: string) => option !== updatedCharacter.name.value);
    }

    if (this.target.name.value === guess) {
      setTimeout(() => {
        window.ConfettiManager.triggerConfetti();
      }, 3000);
    }
  }

  addStatusToCharacter(guessedCharacter: Character, target: Character): Character {
    const updatedCharacter: Character = { ...guessedCharacter };

    for (const key in guessedCharacter) {
      if (guessedCharacter.hasOwnProperty(key)) {
        const guessedValue = guessedCharacter[key].value;
        const targetValue = target[key].value;

        let status: string = 'incorrect';

        if (guessedValue === targetValue) {
          status = 'correct';
        } else if (parseFloat(guessedValue as string) > parseFloat(targetValue as string)) {
          status = 'greater';
        } else if (parseFloat(guessedValue as string) < parseFloat(targetValue as string)) {
          status = 'smaller';
        }

        if (key === 'films') {
          const guessedFilms = guessedCharacter[key].value || [];
          const targetFilms = target[key].value || [];

          const filmsMatch = guessedFilms.every(film => targetFilms.includes(film));

          if (filmsMatch) {
            status = 'correct';
          } else {
            const filmsPartialMatch = guessedFilms.some(film => targetFilms.includes(film));
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
}
