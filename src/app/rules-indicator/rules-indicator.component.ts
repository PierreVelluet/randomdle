import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Subject, takeUntil } from 'rxjs';

import { GlobalStateService } from '../global-state.service';
import { AudioService } from '../services/audio.service';
import { GameState, ThemeData } from '../models/theme.enum';
import { Status } from '../models/status.enum';

@Component({
  selector: 'app-rules-indicator',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  templateUrl: './rules-indicator.component.html',
  styleUrl: './rules-indicator.component.scss',
})
export class RulesIndicatorComponent implements OnInit, OnDestroy {
  constructor(
    private globalState: GlobalStateService,
    private audioService: AudioService
  ) { }

  private readonly destroy$ = new Subject<void>();
  private revealInterval?: ReturnType<typeof setInterval>;
  GameState = GameState;
  labelText = '';
  nameToReveal = '';
  revealedName = '';
  revealSpeed = 40;
  currentThemeData$ = this.globalState.currentThemeData$;

  readonly filteredStatuses = Object.values(Status).filter(
    s => s !== Status.Greater && s !== Status.Smaller
  );

  ngOnInit(): void {
    this.currentThemeData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((themeData: ThemeData | undefined) => {
        if (themeData && themeData?.gameState != GameState.IN_PROGRESS) {
          this.revealName(themeData.targetItem.name.value);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.clearRevealInterval();
  }

  onClose(): void {
    this.globalState.setColorsIndicatorVisibility(false);
  }

  processToThemeChoice(): void {
    this.globalState.setIsHidingTheme(false);
    this.audioService.fadeOutAndStopAudio();
  }

  getProgressBarColor(progress: number): string {
    const max = this.globalState.getCurrentThemeData().maxGuessNumber;
    const percent = progress / max;
    const red = Math.floor(255 * percent);
    const green = Math.floor(255 * (1 - percent));
    return `rgb(${red}, ${green}, 0)`;
  }

  private revealName(name: string): void {
    this.clearRevealInterval();
    this.revealedName = '';
    this.nameToReveal = name;

    let index = 0;
    this.revealInterval = setInterval(() => {
      if (index < this.nameToReveal.length) {
        this.revealedName += this.nameToReveal[index++];
      } else {
        this.clearRevealInterval();
      }
    }, this.revealSpeed);
  }

  private clearRevealInterval(): void {
    if (this.revealInterval) {
      clearInterval(this.revealInterval);
      this.revealInterval = undefined;
    }
  }
}
