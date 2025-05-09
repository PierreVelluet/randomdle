import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { GuessResultComponent } from '../guess-result/guess-result.component';
import { GuessInputComponent } from '../guess-input/guess-input.component';
import { Theme, ThemeData } from '../../models/theme.enum';
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
    RulesIndicatorComponent,
  ],
  templateUrl: './guess-container.component.html',
  styleUrl: './guess-container.component.scss',
  standalone: true,

})
export class GuessContainerComponent {
  constructor(
    private gameService: GameService,
    private globalState: GlobalStateService
  ) { }

  private readonly destroy$ = new Subject<void>();
  isColorsIndicatorVisible$ = this.globalState.isColorsIndicatorVisible$;
  currentThemeData$ = this.globalState.currentThemeData$;

  ngOnInit(): void {
    this.globalState.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme: Theme | null) => {
        if (theme) this.initGameData();
      });

    this.globalState.currentThemeData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((themeData: ThemeData | undefined) => {
        if (themeData && themeData?.guessedItems?.length > 1) {
        }
      });
  }

  initGameData(): void {
    this.globalState.initGameData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
