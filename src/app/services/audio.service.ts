import { Injectable } from '@angular/core';
import { Theme } from '../models/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private themeAudio: HTMLAudioElement = new Audio();
  private fadeInterval: any;
  private fadeInInterval: any;

  constructor() { }

  playAudio(theme: Theme | null): void {
    const newSrc = 'assets/audios/' + (theme ?? 'ambiant') + '_audio_' + (Math.floor(Math.random() * 3) + 1) + '.mp3';

    // If already playing something, fade out first
    if (!this.themeAudio.paused) {
      this.fadeOut(() => {
        this.startNewAudio(newSrc, theme);
      });
    } else {
      this.startNewAudio(newSrc, theme);
    }
  }

  private startNewAudio(src: string, theme: Theme | null) {
    this.themeAudio.src = src;
    this.themeAudio.load();
    this.themeAudio.volume = 0;
    this.themeAudio.play();
    this.themeAudio.loop = true;
    this.fadeIn(theme ? 0.75 : 0.25);
  }

  private fadeOut(callback: () => void) {
    clearInterval(this.fadeInterval);
    this.fadeInterval = setInterval(() => {
      if (this.themeAudio.volume > 0.05) {
        this.themeAudio.volume -= 0.05;
      } else {
        clearInterval(this.fadeInterval);
        this.themeAudio.pause();
        callback();
      }
    }, 75);
  }

  private fadeIn(targetVolume: number) {
    clearInterval(this.fadeInInterval);
    this.fadeInInterval = setInterval(() => {
      if (this.themeAudio.volume < targetVolume - 0.05) {
        this.themeAudio.volume += 0.05;
      } else {
        this.themeAudio.volume = targetVolume;
        clearInterval(this.fadeInInterval);
      }
    }, 75);
  }

  reStartAudio() {
    this.themeAudio.play();
  }

  pauseAudio(): void {
    this.themeAudio.pause();
  }

  stopAudio(): void {
    this.themeAudio.pause();
    this.themeAudio.currentTime = 0;
  }

  fadeOutAndStopAudio(): void {
    this.fadeOut(() => {
      this.stopAudio();
      this.playAudio(null);
    });
  }
}
