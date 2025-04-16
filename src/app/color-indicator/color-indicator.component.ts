import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Status } from '../models/status.enum';
import { Univers } from '../models/univers.enum';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'app-color-indicator',
  imports: [CommonModule, TooltipModule],
  templateUrl: './color-indicator.component.html',
  styleUrl: './color-indicator.component.scss',
  standalone: true,
})
export class ColorIndicatorComponent {
  @Input() univer: Univers | null = null;
  @Output() crossClicked = new EventEmitter<boolean>();
  status: Status[] = Object.values(Status).filter(
    (obj: Status) => obj != 'greater' && obj != 'smaller'
  );

  onClose(): void {
    this.crossClicked.emit(false);
  }
}
