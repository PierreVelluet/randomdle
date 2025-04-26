import { GuessHeader } from "./guess-header.model";
import { Character } from "./swCharacter.model";

export enum Theme {
  StarWars = 'sw',
  LordOfTheRing = 'lotr',
  HarryPotter = 'hp',
}

export interface ThemeData {
  themeName: Theme;
  winStreak: number;
  done: boolean;
  success: boolean;
  headers: GuessHeader[];
  items: Character[];
  inputItems: string[];
  guessedItems: Character [];
  targetItem: Character ;
  logoSrc: string;
  maxGuessNumber: number;
}