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
  characterToGuess: SwCharacter | null = null;
  guessedCharacters: SwCharacter[] = [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'Homme',
      eye_color: 'Bleu',
      homeworld: 'Tatooine',
      films: ['IV', 'V', 'VI', 'III'],
      species: 'Humain',
    },
  ];
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    const gameKey = 'starwarsdle';
    this.gameService.getGameData(gameKey).subscribe((data) => {
      if (data) {
        console.log('data', data.headers);
        this.headers = data.headers;
      }
    });
    console.log('<guess-result.component> headers', this.headers);
  }
}
