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
}
