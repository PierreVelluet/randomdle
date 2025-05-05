import { Injectable } from '@angular/core';
import { Character } from '../models/swCharacter.model';
import { Status } from '../models/status.enum';

@Injectable({
  providedIn: 'root',
})
export class GameLogicService {
  findGuessedCharacter(
    guess: string,
    items: Character[],
    targetItem: Character
  ): Character | null {
    const guessedCharacter: Character | undefined = items.find(
      (character: Character) => character.name.value === guess
    );
    if (!guessedCharacter) {
      return null;
    }

    const updatedCharacter = this.addStatusToCharacter(
      guessedCharacter,
      targetItem
    );

    return updatedCharacter;
  }

  private addStatusToCharacter(
    guessedCharacter: Character,
    target: Character
  ): Character {
    const updatedCharacter: Character = { ...guessedCharacter };

    for (const key in guessedCharacter) {
      if (!guessedCharacter.hasOwnProperty(key)) continue;

      const guessedValue = guessedCharacter[key].value;
      const targetValue = target[key].value;

      let status: Status = Status.Incorrect;
      if (key === 'films') {
        if (guessedCharacter === target) {
          status = Status.Correct;
        } else status = this.getFilmsStatus(guessedValue, target);
      } else if (guessedValue === targetValue) {
        status = Status.Correct;
      } else if (!isNaN(+guessedValue) && !isNaN(+targetValue)) {
        status = this.getNumericStatus(guessedValue, target);
      }

      updatedCharacter[key].status = status;
    }

    return updatedCharacter;
  }

  private getNumericStatus(guessed: unknown, target: unknown): Status {
    const guessedNum = parseFloat(guessed as string);
    const targetNum = parseFloat(target as string);

    if (isNaN(guessedNum) || isNaN(targetNum)) return Status.Incorrect;
    if (guessedNum > targetNum) return Status.Greater;
    if (guessedNum < targetNum) return Status.Smaller;
    return Status.Correct;
  }

  private getFilmsStatus(guessed: unknown, target: unknown): Status {
    const guessedFilms = Array.isArray(guessed) ? guessed : [];
    const targetFilms = Array.isArray(target) ? target : [];

    const allMatch = guessedFilms.every((film) => targetFilms.includes(film));
    const anyMatch = guessedFilms.some((film) => targetFilms.includes(film));

    if (allMatch) return Status.Correct;
    if (anyMatch) return Status.Proche;
    return Status.Incorrect;
  }
}
