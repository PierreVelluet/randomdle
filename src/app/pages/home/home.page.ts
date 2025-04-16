import { Component } from '@angular/core';
import { GuessContainerComponent } from '../../components/guess-container/guess-container.component';
import { UniversesContainerComponent } from '../../components/universes-container/universes-container.component';
import { Univers } from '../../models/univers.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [GuessContainerComponent, UniversesContainerComponent, CommonModule],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  standalone: true,
})
export class HomePage {
  univers = Object.values(Univers);
  chosenUniver: Univers | null = Univers.LordOfTheRing;
  isHidingUniverses = false;

  onChooseUniverse(univer: Univers): void {
    this.isHidingUniverses = true;
    setTimeout(() => {
      this.chosenUniver = univer;
    }, 800);
  }
}
