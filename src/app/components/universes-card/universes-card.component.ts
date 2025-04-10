import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-universes-card',
  imports: [MatCardModule, CommonModule, LazyLoadImageModule],
  templateUrl: './universes-card.component.html',
  styleUrl: './universes-card.component.scss',
  standalone: true
})
export class UniversesCardComponent implements OnInit {

  @Input() public isClickPrevented!: boolean;
  @Input() public defaultImage!: string;
  @Input() public univer: string = '';

  hovered: boolean;
  trimedDescription: string;
  lazyLoadImage!: string;
  public isLoading: boolean = false;

  constructor(public dialog: MatDialog) {
    this.hovered = false;
    this.trimedDescription = '';
  }

  ngOnInit() {
    console.log('🧪 univer input received:', this.univer);
    if (this.univer) {
      this.defaultImage = `/assets/images/${this.univer}.webp`;
      this.lazyLoadImage = this.defaultImage;
    }
  }

  public hoverHandler(): void {
    this.hovered = !this.hovered;
  }
}
