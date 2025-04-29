import {
  Component
} from '@angular/core';
import { GameService } from '../../services/game.service';
import { GuessResultComponent } from '../guess-result/guess-result.component';
import { GuessInputComponent } from '../guess-input/guess-input.component';
import { Character } from '../../models/swCharacter.model';
import { Theme } from '../../models/theme.enum';
import { ColorIndicatorComponent } from '../../color-indicator/color-indicator.component';
import { CommonModule } from '@angular/common';
import { GlobalStateService } from '../../global-state.service';
import { Subject, takeUntil } from 'rxjs';
import { RulesIndicatorComponent } from '../../rules-indicator/rules-indicator.component';

@Component({
  selector: 'app-guess-container',
  imports: [
    CommonModule,
    GuessInputComponent,
    GuessResultComponent,
    ColorIndicatorComponent,
    RulesIndicatorComponent
  ],
  templateUrl: './guess-container.component.html',
  styleUrl: './guess-container.component.scss',
  standalone: true,
})
export class GuessContainerComponent {
  constructor(private gameService: GameService, private globalState: GlobalStateService) { }

  private readonly destroy$ = new Subject<void>();
  isColorsIndicatorVisible$ = this.globalState.isColorsIndicatorVisible$;
  currentThemeData$ = this.globalState.currentThemeData$;

  ngOnInit(): void {
    this.globalState.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: Theme | null) => {
        if (theme) this.initGameData();
      });
  }

  initGameData(): void {
    this.gameService.getGameData(this.globalState.getCurrentThemeData().themeName).subscribe((data) => {
      if (data) {
        const randomNumber = Math.floor(
          Math.random() * (data.characters.length + 1)
        );
        this.globalState.updateCurrentThemeData({
          headers: data.headers,
          items: data.characters,
          inputItems: data.characters.map((character: Character) => {
            return character.name.value;
          }),
          logoSrc: `assets/images/${this.globalState.getCurrentThemeData().themeName}_logo.webp`,
          targetItem: data.characters[randomNumber]
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
