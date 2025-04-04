import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() inputOptions: string []= []

  filteredOptions: string[] = [];

  filterOptions() {
    this.filteredOptions = this.inputOptions.filter(option =>
      option.toLowerCase().includes(this.guess.toLowerCase())
    );
  }

  selectOption(option: string) {
    this.guess = option;
    this.filteredOptions = [];
  }

  isValidGuess(): boolean {
    return this.inputOptions.includes(this.guess);
  }

  submitGuess() {
    if (this.isValidGuess()) {
      this.guessSubmitted.emit(this.guess.trim());
      this.guess = ''; 
      this.filteredOptions = [];
    }
  }
}
