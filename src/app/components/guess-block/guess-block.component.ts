import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guess-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guess-block.component.html',
  styleUrls: ['./guess-block.component.scss'],
})
export class GuessBlockComponent {
  @Input() attribute: string | string[] = '';
  @Input() status: string = ""//'correct' | 'partial' | 'greater' | 'smaller' | 'incorrect' = 'incorrect';

  ngOnInit() {
  }
}
