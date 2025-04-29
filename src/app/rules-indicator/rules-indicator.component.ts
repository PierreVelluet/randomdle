import { Component } from '@angular/core';
import { GlobalStateService } from '../global-state.service';
import { CommonModule } from '@angular/common';
import { Status } from '../models/status.enum';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Subject, takeUntil } from 'rxjs';
import { ThemeData } from '../models/theme.enum';

@Component({
  selector: 'app-rules-indicator',
  imports: [CommonModule, TooltipModule],
  templateUrl: './rules-indicator.component.html',
  styleUrl: './rules-indicator.component.scss',
  standalone: true
})
export class RulesIndicatorComponent {
  private readonly destroy$ = new Subject<void>();

  constructor(private globalState: GlobalStateService) { }

  isFlipped = false;

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  ngOnInit(): void {

    this.globalState.currentThemeData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((themeData: ThemeData | undefined) => {
        if (themeData && themeData?.guessedItems?.length > 1) {
          this.revealName(themeData.targetItem.name.value)
        }
      });
  }

  currentThemeData$ = this.globalState.currentThemeData$;
  status: Status[] = Object.values(Status).filter(
    (obj: Status) => obj != Status.Greater && obj != Status.Smaller
  );

  getProgressBarColor(progress: number): string {
    const percentage = progress / this.globalState.getCurrentThemeData().maxGuessNumber;
    console.log('percentage', percentage)
    const red = Math.min(255, Math.floor(255 * percentage));
    const green = Math.min(255, Math.floor(255 * (1 - percentage)));
    return `rgb(${red}, ${green}, 0)`;
  }

  onClose(): void {
    this.globalState.setColorsIndicatorVisibility(false);
  }

  revealedText = '';
  fullText = '';
  revealSpeed = 50;

  revealName(name: string) {
    this.revealedText = '';
    this.fullText = name;
    let index = 0;

    const interval = setInterval(() => {
      if (index < this.fullText.length) {
        this.revealedText += this.fullText[index];
        index++;
      } else {
        clearInterval(interval);
      }
    }, this.revealSpeed);
  }

}
