import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Status } from '../models/status.enum';
import { Theme } from '../models/theme.enum';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'app-color-indicator',
  imports: [CommonModule, TooltipModule],
  templateUrl: './color-indicator.component.html',
  styleUrl: './color-indicator.component.scss',
  standalone: true,
})
export class ColorIndicatorComponent {
  @Input() theme: Theme | null = null;
  @Output() crossClicked = new EventEmitter<boolean>();
  status: Status[] = Object.values(Status).filter(
    (obj: Status) => obj != 'greater' && obj != 'smaller'
  );

  onClose(): void {
    this.crossClicked.emit(false);
  }
}
