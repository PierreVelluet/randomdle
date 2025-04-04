import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GuessResultComponent } from '../guess-result/guess-result.component';
import { GuessInputComponent } from '../guess-input/guess-input.component';
import { SwCharacter } from '../../models/swCharacter.model';

@Component({
  selector: 'app-guess-container',
  standalone: true,
  imports: [GuessInputComponent, GuessResultComponent],
  templateUrl: './guess-container.component.html',
  styleUrl: './guess-container.component.scss',
})
export class GuessContainerComponent {
  headers: any[] = [];
  target: SwCharacter =
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'Homme',
      eye_color: 'Bleu',
      homeworld: 'Tatooine',
      films: ['IV', 'V', 'VI', 'III'],
      species: 'Humain',
      status: ""
    };
  allCharacters: SwCharacter[] = [];
  guessedCharacters: SwCharacter[] = [];
  inputOptions: string[] = [];

  constructor(private gameService: GameService) { }

  handleGuess(guess: string) {
    const guessedCharacter: SwCharacter | undefined = this.allCharacters.find((character: SwCharacter) => character.name == guess)
    if (guessedCharacter) {
      this.guessedCharacters.push(guessedCharacter);
      this.inputOptions = this.inputOptions.filter((option: string) => option != guessedCharacter.name);
    }
  }

  ngOnInit(): void {
    const gameKey = 'starWars';
    this.gameService.getGameData(gameKey).subscribe((data) => {
      if (data) {
        this.headers = data.headers;
        this.allCharacters = data.characters;
        this.inputOptions = data.characters.map((character: SwCharacter) => character.name)
      }
    });
  }
}
