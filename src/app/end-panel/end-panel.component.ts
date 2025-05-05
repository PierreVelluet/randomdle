import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GlobalStateService } from '../global-state.service';
import { Subject, takeUntil } from 'rxjs';
import { ThemeData } from '../models/theme.enum';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-end-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './end-panel.component.html',
  styleUrl: './end-panel.component.scss',
})
export class EndPanelComponent {
  private readonly destroy$ = new Subject<void>();
  currentThemeData$ = this.globalState.currentThemeData$;
  labelText = 'Réponse:';
  nameToReveal = '';
  revealedName = '';
  revealSpeed = 50;

  constructor(
    private globalState: GlobalStateService,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.globalState.currentThemeData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((themeData: ThemeData | undefined) => {
        if (themeData && themeData.done) {
          this.revealName(themeData.targetItem.name.value);
        }

        if (themeData?.done && themeData.success) {
          window.ConfettiManager.triggerConfetti();
        }
      });
  }

  processToThemeChoice(): void {
    this.globalState.setIsHidingTheme(false);
    this.audioService.fadeOutAndStopAudio();
  }

  revealName(name: string) {
    this.revealedName = '';
    this.nameToReveal = name;
    let index = 0;

    const interval = setInterval(() => {
      if (index < this.nameToReveal.length) {
        this.revealedName += this.nameToReveal[index];
        index++;
      } else {
        clearInterval(interval);
      }
    }, this.revealSpeed);
  }
}
