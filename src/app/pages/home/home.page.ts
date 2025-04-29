import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
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
  isSoundIconVisible: boolean = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly globalState: GlobalStateService,
    private audioService: AudioService
  ) {
    this.audioService.isPlaying$.subscribe((isPlaying) => {
      if (isPlaying) this.isSoundIconVisible = true;

      setTimeout(() => {
        this.updateSliderBackground(this.currentVolume);
      }, 0);
    });
  }
  @ViewChild('volumeSlider') volumeSlider!: ElementRef<HTMLInputElement>;

  currentVolume = 0.75;
  ngAfterViewInit() {
    this.updateSliderBackground(this.currentVolume);
  }

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
        if (themeData?.guessedItems.length == 1) {
          this.globalState.setShowModal(true);
        }
      });
  }

  onVolumeChange(event: any) {
    const volume = parseFloat(event.target.value);
    this.currentVolume = volume;
    this.audioService.setVolume(volume);
    this.updateSliderBackground(volume);
  }

  updateSliderBackground(volume: number) {
    const percentage = volume * 100;
    this.volumeSlider.nativeElement.style.background = `linear-gradient(to right, #6a1c20 0%, #6a1c20 ${percentage}%, beige ${percentage}%, beige 100%)`;
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
