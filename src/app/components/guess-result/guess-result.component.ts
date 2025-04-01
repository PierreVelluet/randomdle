import { Component, Input, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Importer HttpClientModule
import { CommonModule } from '@angular/common';
import { GuessBlockComponent } from '../guess-block/guess-block.component';
import { SwCharacter } from '../../models/swCharacter.model';

@Component({
  selector: 'app-guess-result',
  standalone: true,
  imports: [HttpClientModule, CommonModule, GuessBlockComponent], // Assure-toi que HttpClientModule est dans les imports
  templateUrl: './guess-result.component.html',
  styleUrls: ['./guess-result.component.scss'],
})
export class GuessResultComponent {
  @Input() guessedCharacters: SwCharacter[] = [];
  @Input() headers
}
