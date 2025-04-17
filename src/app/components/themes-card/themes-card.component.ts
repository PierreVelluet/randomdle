import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-themes-card',
  imports: [MatCardModule, CommonModule, LazyLoadImageModule],
  templateUrl: './themes-card.component.html',
  styleUrl: './themes-card.component.scss',
  standalone: true
})
export class ThemesCardComponent implements OnInit {

  @Input() public isClickPrevented!: boolean;
  @Input() public defaultImage!: string;
  @Input() public theme: string = '';

  hovered: boolean;
  trimedDescription: string;
  lazyLoadImage!: string;
  public isLoading: boolean = false;

  constructor(public dialog: MatDialog) {
    this.hovered = false;
    this.trimedDescription = '';
  }

  ngOnInit() {
    if (this.theme) {
      this.defaultImage = `/assets/images/${this.theme}.webp`;
      this.lazyLoadImage = this.defaultImage;
    }
  }

  public hoverHandler(): void {
    this.hovered = !this.hovered;
  }
}
