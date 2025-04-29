import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Status } from '../models/status.enum';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { GlobalStateService } from '../global-state.service';

@Component({
  selector: 'app-color-indicator',
  imports: [CommonModule, TooltipModule],
  templateUrl: './color-indicator.component.html',
  styleUrl: './color-indicator.component.scss',
  standalone: true,
})
export class ColorIndicatorComponent {

  constructor(private globalState: GlobalStateService) { }
  currentThemeData$ = this.globalState.currentThemeData$;

  status = [
    {
      name: "proche",
      tooltip: "Une ou plusieurs informations sont correctes, mais pas toutes."
    },
    {
      name: "correct",
      tooltip: "L'information est correcte."
    },
    {
      name: "incorrect",
      tooltip: "L'information est incorrecte."
    },
  ]

  //correct, proche
  // status: Status[] = Object.values(Status).filter(
  //   (obj: Status) => obj != Status.Greater && obj != Status.Smaller
  // );

  onClose(): void {
    this.globalState.setColorsIndicatorVisibility(false);
  }
}
