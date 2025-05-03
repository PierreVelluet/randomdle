import { Component } from '@angular/core';
import { GlobalStateService } from '../global-state.service';
import { CommonModule } from '@angular/common';
import { Status } from '../models/status.enum';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'app-rules-indicator',
  imports: [CommonModule, TooltipModule],
  templateUrl: './rules-indicator.component.html',
  styleUrl: './rules-indicator.component.scss',
  standalone: true
})
export class RulesIndicatorComponent {
  constructor(private globalState: GlobalStateService) { }

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
}
