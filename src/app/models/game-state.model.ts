import { Character } from './swCharacter.model';
import { Theme } from './theme.enum';

interface ThemeState {
  themeName: Theme;
  target: Character;
  guessCharacters: Character[];
}

export interface GameState {
    themeStates: ThemeState[];
}
