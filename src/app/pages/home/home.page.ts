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
  chosenUniver: Univers | null = null;
  isHidingUniverses = false;

  ngOnInit(): void {}

  onChooseUniverse(univer: Univers): void {
    this.isHidingUniverses = true;
     // Wait for fadeOut animation to complete before actually switching
  setTimeout(() => {
    this.chosenUniver = univer;
  }, 800); // Match the animation-duration
  }
}
