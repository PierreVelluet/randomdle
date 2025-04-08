import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversesCardComponent } from '../universes-card/universes-card.component';
import { Univers } from '../../models/univers.enum';
import { R } from '@angular/core/event_dispatcher.d-PWnbqZDx';

@Component({
  selector: 'app-universes-container',
  imports: [UniversesCardComponent, CommonModule],
  templateUrl: './universes-container.component.html',
  styleUrl: './universes-container.component.scss',
  standalone: true,
})
export class UniversesContainerComponent {
  @Output() chooseUniverse: EventEmitter<Univers> = new EventEmitter<Univers>();
  univers = Object.values(Univers);
  isClickable: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isClickable = true;
    }, 3000);
  }

  onChooseUniverse(univer: Univers): void {
    if (!this.isClickable) return;
    this.chooseUniverse.emit(univer);
  }
}
