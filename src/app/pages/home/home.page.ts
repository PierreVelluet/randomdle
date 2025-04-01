import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GuessContainerComponent } from '../../components/guess-container/guess-container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GuessContainerComponent, HttpClientModule],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {}
