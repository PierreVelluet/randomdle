import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Theme } from '../../models/theme.enum';
import { Keys } from '../../models/keys.enum';

@Component({
  selector: 'app-guess-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './guess-input.component.html',
  styleUrl: './guess-input.component.scss',
  standalone: true
})
export class GuessInputComponent {
  guess: string = '';
  @Output() guessSubmitted = new EventEmitter<string>();
  @Input() inputOptions: string[] = []
  @Input() theme: Theme | null = null;


  @ViewChildren('dropdownItem') dropdownItems!: QueryList<ElementRef>;

  filteredOptions: string[] = [];
  activeOptionIndex: number = -1;

  filterOptions() {

    if (!this.guess.trim()) {
      this.filteredOptions = [];
      this.activeOptionIndex = -1;
      return;
    }

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

  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case Keys.ArrowDown:
        event.preventDefault();
        this.activeOptionIndex = (this.activeOptionIndex + 1) % this.filteredOptions.length;
        this.scrollToActiveOption();
        break;

      case Keys.ArrowUp:
        event.preventDefault();
        this.activeOptionIndex =
          (this.activeOptionIndex - 1 + this.filteredOptions.length) % this.filteredOptions.length;
        this.scrollToActiveOption();
        break;

      case Keys.Enter:
        if (this.activeOptionIndex >= 0) {
          this.guess = this.filteredOptions[this.activeOptionIndex];
          this.filteredOptions = [];
          this.activeOptionIndex = -1;
          event.preventDefault();
        } else {
          this.submitGuess();
        }
        break;

      case Keys.Escape:
        this.filteredOptions = [];
        break;
    }
  }
  
  private scrollToActiveOption(): void {
    const items = this.dropdownItems?.toArray();
    if (items?.[this.activeOptionIndex]) {
      items[this.activeOptionIndex].nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }

}
