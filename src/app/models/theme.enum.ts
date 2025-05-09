import { GuessHeader } from "./guess-header.model";
import { Character } from "./swCharacter.model";

export enum Theme {
  StarWars = 'sw',
  LordOfTheRing = 'lotr',
  HarryPotter = 'hp',
}

export enum GameState {
  IN_PROGRESS,
  WON,
  LOST
}

export interface ThemeData {
  themeName: Theme;
  winStreak: number;
  gameState: GameState;
  headers: GuessHeader[];
  items: Character[];
  inputItems: string[];
  guessedItems: Character[];
  targetItem: Character;
  pastTargetItems: Character[];
  logoSrc: string;
  maxGuessNumber: number;
  date: string;
}