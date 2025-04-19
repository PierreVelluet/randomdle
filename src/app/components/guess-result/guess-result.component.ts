import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuessBlockComponent } from '../guess-block/guess-block.component';
import { Character } from '../../models/swCharacter.model';
import { GuessHeader } from '../../models/guess-header.model';
import { Theme } from '../../models/theme.enum';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'app-guess-result',
  imports: [CommonModule, GuessBlockComponent, TooltipModule],
  templateUrl: './guess-result.component.html',
  styleUrls: ['./guess-result.component.scss'],
  standalone: true,
})
export class GuessResultComponent {
  @Input() guessedCharacters: Character[] = [];
  @Input() headers: GuessHeader[] = [];
  @Input() target!: Character;
  @Input() theme: Theme | null = null;

  ngOnInit(): void {}

  getProgressBarColor(progress: number): string {
    const percentage = progress / 7;
    const red = Math.min(255, Math.floor(255 * percentage));
    const green = Math.min(255, Math.floor(255 * (1 - percentage)));
    return `rgb(${red}, ${green}, 0)`;
  }
}
