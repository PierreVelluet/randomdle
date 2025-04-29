import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuessBlockComponent } from '../guess-block/guess-block.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { GlobalStateService } from '../../global-state.service';

@Component({
  selector: 'app-guess-result',
  imports: [CommonModule, GuessBlockComponent, TooltipModule],
  templateUrl: './guess-result.component.html',
  styleUrls: ['./guess-result.component.scss'],
  standalone: true,
})
export class GuessResultComponent {

  currentThemeData$ = this.globalState.currentThemeData$;

  constructor(
    private globalState: GlobalStateService
  ) { }

}
