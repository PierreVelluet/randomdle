import { Injectable } from '@angular/core';
import { Theme } from '../models/theme.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  themeAudio: HTMLAudioElement = new Audio();

  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  isPlaying$ = this.isPlayingSubject.asObservable();

  private fadeInterval: any;
  private fadeInInterval: any;
  private initialThemeVolume: number = 0.75;
  private initialAmbiantVolume: number = 0.25;

  constructor() {
    this.setupAudioEvents();
  }

  private setupAudioEvents() {
    this.themeAudio.addEventListener('playing', () => {
      this.isPlayingSubject.next(true);
    });

    this.themeAudio.addEventListener('pause', () => {
      this.isPlayingSubject.next(false);
    });

    this.themeAudio.addEventListener('ended', () => {
      this.isPlayingSubject.next(false);
    });
  }

  playAudio(theme: Theme | null): void {
    const newSrc = 'assets/audios/' + (theme ?? 'ambiant') + '_audio_' + (Math.floor(Math.random() * 3) + 1) + '.mp3';

    if (!this.themeAudio.paused) {
      this.fadeOut(() => {
        this.startNewAudio(newSrc, theme);
      });
    } else {
      this.startNewAudio(newSrc, theme);
    }
  }

  get themeVolume(): number {
    return this.initialThemeVolume;
  }

  get ambiantVolume(): number {
    return this.initialAmbiantVolume;
  }

  private startNewAudio(src: string, theme: Theme | null) {
    this.themeAudio.src = src;
    this.themeAudio.load();
    this.themeAudio.volume = 0;
    this.themeAudio.play();
    this.themeAudio.loop = true;
    this.fadeIn(theme ? this.initialThemeVolume : this.initialAmbiantVolume);
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

  setVolume(volume: number): void {
    this.themeAudio.volume = volume;
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
