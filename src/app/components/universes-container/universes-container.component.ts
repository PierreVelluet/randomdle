import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversesCardComponent } from '../universes-card/universes-card.component';
import { Univers } from '../../models/univers.enum';

@Component({
  selector: 'app-universes-container',
  standalone: true,
  imports: [UniversesCardComponent, CommonModule],
  templateUrl: './universes-container.component.html',
  styleUrl: './universes-container.component.scss',
})
export class UniversesContainerComponent {
  
  univers = Object.values(Univers);
  

  ngOnInit(){
    console.log('<universes-container.component> universList', this.univers);
  }
}
