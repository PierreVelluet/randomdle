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
}
