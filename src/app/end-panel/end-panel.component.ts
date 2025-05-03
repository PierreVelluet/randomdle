import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GlobalStateService } from '../global-state.service';
import { Subject, takeUntil } from 'rxjs';
import { ThemeData } from '../models/theme.enum';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-end-panel',
  imports: [CommonModule],
  templateUrl: './end-panel.component.html',
  styleUrl: './end-panel.component.scss',
  standalone: true
})
export class EndPanelComponent {
  private readonly destroy$ = new Subject<void>();
  currentThemeData$ = this.globalState.currentThemeData$;
  revealedText = '';
  fullText = '';
  revealSpeed = 50;

  constructor(private globalState: GlobalStateService, private audioService: AudioService) { }
  private readonly timeoutDelay = 3500;
  ngOnInit(): void {

    this.globalState.currentThemeData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((themeData: ThemeData | undefined) => {
        if (themeData && themeData?.guessedItems?.length > 1) {
          this.revealName(themeData.targetItem.name.value)
        }

        if (themeData && themeData.done && themeData.success) {
          window.ConfettiManager.triggerConfetti();
        }
      });
  }

  // this.globalState.currentThemeData$
  // .pipe(takeUntil(this.destroy$))
  // .subscribe((themeData) => {
  //   if (themeData?.done) {
  //     this.isHidingThemes = false;
  //   }
  // });
  processToThemeChoice(): void {
    this.globalState.setIsHidingTheme(false);
  }

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
