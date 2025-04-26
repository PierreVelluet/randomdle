import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GuessContainerComponent } from '../../components/guess-container/guess-container.component';
import { ThemesContainerComponent } from '../../components/themes-container/themes-container.component';
import { Theme } from '../../models/theme.enum';
import { GlobalStateService } from '../../global-state.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GuessContainerComponent, ThemesContainerComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage implements OnInit, OnDestroy {
  readonly themes = Object.values(Theme);
  chosenTheme: Theme | null = null;
  isHidingThemes = false;
  isSoundOn: boolean = true;

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly globalState: GlobalStateService, private audioService: AudioService) { }

  ngOnInit(): void {
    this.globalState.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme) => {
        if (theme) {
          this.chosenTheme = theme;
          setTimeout(() => (this.isHidingThemes = true), 50);
        }
      });

    this.globalState.currentThemeData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((themeData) => {
        if (themeData?.done) {
          this.isHidingThemes = false;
        }
      });
  }

  toggleSound() {
    if (this.isSoundOn) {
      this.audioService.pauseAudio();
    } else {
      this.audioService.reStartAudio();
    }
    this.isSoundOn = !this.isSoundOn;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
