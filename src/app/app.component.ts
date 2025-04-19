import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ScrollingTextComponent } from "./scrolling-text/scrolling-text.component";

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, ScrollingTextComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
})
export class AppComponent {
  title = 'starwarsDle';
}
