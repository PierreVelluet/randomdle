import { Component } from '@angular/core';
import { GuessContainerComponent } from '../../components/guess-container/guess-container.component';
import { ThemesContainerComponent } from '../../components/themes-container/themes-container.component';
import { Theme } from '../../models/theme.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [GuessContainerComponent, ThemesContainerComponent, CommonModule],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  standalone: true,
})
export class HomePage {
  themes = Object.values(Theme);
  chosenTheme: Theme | null = null;
  isHidingThemes = false;

  onChooseThemes(theme: Theme): void {
    this.isHidingThemes = true;
    setTimeout(() => {
      this.chosenTheme = theme;
    }, 800);
  }
}
