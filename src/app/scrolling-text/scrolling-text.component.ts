import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scrolling-text',
  templateUrl: './scrolling-text.component.html',
  styleUrls: ['./scrolling-text.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ScrollingTextComponent {
  constructor() {}
}
