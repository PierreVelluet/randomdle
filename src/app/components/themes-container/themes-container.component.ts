import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameState, Theme, ThemeData } from '../../models/theme.enum';
import { GlobalStateService } from '../../global-state.service';
import { Subject, takeUntil } from 'rxjs';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-themes-container',
  imports: [CommonModule],
  templateUrl: './themes-container.component.html',
  styleUrl: './themes-container.component.scss',
  standalone: true,
})
export class ThemesContainerComponent implements OnInit, OnDestroy {
  themes = Object.values(Theme);
  themesDatas: ThemeData[] | null = null;
  private destroy$ = new Subject<void>();
  currentThemeData$ = this.globalState.currentThemeData$;
  GameState = GameState;
  constructor(private globalState: GlobalStateService, private audioService: AudioService) { }

  ngOnInit(): void {
    this.globalState.themesDatas$
      .pipe(takeUntil(this.destroy$))
      .subscribe((themesDatas: ThemeData[] | null) => {
        console.log('themesDatas', themesDatas)
        this.themesDatas = themesDatas;
      });
  }

  getThemeData(theme: Theme): ThemeData | undefined {
    return this.themesDatas?.find(t => t.themeName === theme);
  }


  onChoosetheme(theme: Theme): void {
    this.globalState.setTheme(theme);
    this.audioService.playAudio(theme)
  }

  isThemeWon(theme: Theme): boolean {
    const data = this.themesDatas?.find((t) => t.themeName === theme);
    return data?.gameState === GameState.WON;
  }

  isThemeLost(theme: Theme): boolean {
    const data = this.themesDatas?.find((t) => t.themeName === theme);
    return data?.gameState === GameState.LOST;
  }

  isThemeInProgress(theme: Theme): boolean {
    const data = this.themesDatas?.find((t) => t.themeName === theme);
    return data?.gameState === GameState.IN_PROGRESS;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
