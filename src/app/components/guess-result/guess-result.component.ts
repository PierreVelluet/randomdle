import { Component, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GuessBlockComponent } from '../guess-block/guess-block.component';
import { SwCharacter } from '../../models/swCharacter.model';
import { GuessHeader } from '../../models/guess-header.model';

@Component({
  selector: 'app-guess-result',
  standalone: true,
  imports: [HttpClientModule, CommonModule, GuessBlockComponent],
  templateUrl: './guess-result.component.html',
  styleUrls: ['./guess-result.component.scss'],
})
export class GuessResultComponent {
  @Input() guessedCharacters: SwCharacter[] = [];
  @Input() headers: GuessHeader[] = [];
  @Input() target!: SwCharacter;

  getStatus(guessedCharacter: SwCharacter, target: SwCharacter, key: keyof SwCharacter): string {
    let status: string = '';

    const guessedValue = guessedCharacter[key];
    const targetValue = target[key];

    if (guessedValue === targetValue) {
      status = 'correct';
    } else if (parseFloat(guessedValue as string) > parseFloat(targetValue as string)) {
      status = 'greater';
    } else if (parseFloat(guessedValue as string) < parseFloat(targetValue as string)) {
      status = 'smaller';
    } else {
      status = 'incorrect';
    }

    if (key === 'films') {
      const guessedFilms = guessedCharacter.films || [];
      const targetFilms = target.films || [];

      const filmsMatch = guessedFilms.every(film => targetFilms.includes(film));

      if (filmsMatch) {
        status = 'correct';
      } else {
        const filmsPartialMatch = guessedFilms.some(film => targetFilms.includes(film));
        if (filmsPartialMatch) {
          status = 'proche';
        } else {
          status = 'incorrect';
        }
      }
    }

    return status;
  }
}
