import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesCardComponent } from '../themes-card/themes-card.component';
import { Theme } from '../../models/theme.enum';

@Component({
  selector: 'app-themes-container',
  imports: [ThemesCardComponent, CommonModule],
  templateUrl: './themes-container.component.html',
  styleUrl: './themes-container.component.scss',
  standalone: true,
})
export class ThemesContainerComponent {
  @Output() chooseTheme: EventEmitter<Theme> = new EventEmitter<Theme>();
  themes = Object.values(Theme);
  isClickable: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isClickable = true;
    }, 3000);
  }

  onChoosetheme(theme: Theme): void {
    if (!this.isClickable) return;
    this.chooseTheme.emit(theme);
  }
}
