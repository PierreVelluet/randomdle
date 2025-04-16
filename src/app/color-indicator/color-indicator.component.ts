import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Status } from '../models/status.enum';
import { Univers } from '../models/univers.enum';

@Component({
  selector: 'app-color-indicator',
  imports: [CommonModule],
  templateUrl: './color-indicator.component.html',
  styleUrl: './color-indicator.component.scss',
  standalone: true
})
export class ColorIndicatorComponent {

  @Input() univer: Univers | null = null;
  status: Status[] = Object.values(Status).filter((obj: Status) => obj != 'greater' && obj != 'smaller');

  ngOnInit(): void {
    console.log('status', this.status)
  }

  onClose(): void { }
}
