import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guess-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guess-input.component.html',
  styleUrl: './guess-input.component.scss',
})
export class GuessInputComponent {
  guess: string = '';

  @Output() guessSubmitted = new EventEmitter<string>();

  submitGuess() {
    if (this.guess.trim()) {
      this.guessSubmitted.emit(this.guess.trim());
      this.guess = '';
    }
  }
}
