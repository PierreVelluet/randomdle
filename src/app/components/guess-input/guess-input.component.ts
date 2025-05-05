import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Keys } from '../../models/keys.enum';
import { GlobalStateService } from '../../global-state.service';
import { GameLogicService } from '../../services/game-logic.service';
import { Subject } from 'rxjs';
import { Character } from '../../models/swCharacter.model';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-guess-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './guess-input.component.html',
  styleUrl: './guess-input.component.scss',
  standalone: true,
})
export class GuessInputComponent {
  guess: string = '';
  private readonly destroy$ = new Subject<void>();

  @ViewChildren('dropdownItem') dropdownItems!: QueryList<ElementRef>;

  filteredOptions: string[] = [];
  activeOptionIndex: number = -1;
  currentThemeData$ = this.globalState.currentThemeData$;

  constructor(
    private globalState: GlobalStateService,
    private gameLogicService: GameLogicService,
    private audioService: AudioService
  ) {}

  filterOptions() {
    if (!this.guess.trim()) {
      this.filteredOptions = [];
      this.activeOptionIndex = -1;
      return;
    }

    this.filteredOptions =
      this.globalState
        .getCurrentThemeData()
        ?.inputItems.filter((option) =>
          option.toLowerCase().includes(this.guess.toLowerCase())
        ) ?? [];
  }

  selectOption(option: string) {
    this.guess = option;
    this.filteredOptions = [];
  }

  isValidGuess(): boolean {
    return (this.globalState.getCurrentThemeData()?.inputItems ?? []).includes(
      this.guess
    );
  }

  handleGuess(guess: string) {
    const currentThemeData = this.globalState.getCurrentThemeData();
    if (!currentThemeData) return;

    const updatedCharacter = this.gameLogicService.findGuessedCharacter(
      guess,
      currentThemeData.items,
      currentThemeData.targetItem
    );

    if (updatedCharacter) {
      const oldGuessedItems: Character[] = currentThemeData.guessedItems ?? [];
      this.globalState.updateCurrentThemeData({
        guessedItems: [updatedCharacter, ...oldGuessedItems],
        inputItems: (currentThemeData.inputItems ?? []).filter(
          (option: string) => option !== updatedCharacter.name.value
        ),
      });
    }

    if (this.globalState.getCurrentThemeData().guessedItems.length == 1)
      this.globalState.setColorsIndicatorVisibility(true);

    this.checkGuessResult(guess);
  }

  checkGuessResult(guess: string): void {
    const currentThemeData = this.globalState.getCurrentThemeData();
    if (!currentThemeData) return;

    if (currentThemeData.targetItem?.name.value == guess) {
      this.globalState.updateCurrentThemeData({
        done: true,
        success: true,
      });
    }

    if (
      currentThemeData.guessedItems?.length >= currentThemeData.maxGuessNumber
    ) {
      this.globalState.updateCurrentThemeData({
        done: true,
        success: false,
      });
    }
  }

  submitGuess() {
    if (this.isValidGuess()) {
      this.handleGuess(this.guess);
      this.guess = '';
      this.filteredOptions = [];
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case Keys.ArrowDown:
        event.preventDefault();
        this.activeOptionIndex =
          (this.activeOptionIndex + 1) % this.filteredOptions.length;
        this.scrollToActiveOption();
        break;

      case Keys.ArrowUp:
        event.preventDefault();
        this.activeOptionIndex =
          (this.activeOptionIndex - 1 + this.filteredOptions.length) %
          this.filteredOptions.length;
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
        block: 'nearest',
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
