import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { GlobalStateService } from '../global-state.service';
import { Subject, takeUntil } from 'rxjs';
import { ThemeData } from '../models/theme.enum';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './result-modal.component.html',
  styleUrls: ['./result-modal.component.scss'],
  standalone: true
})
export class ModalComponent {

  private readonly destroy$ = new Subject<void>();

  currentThemeData$ = this.globalState.currentThemeData$;
  showModal$ = this.globalState.showModal$;

  constructor(private globalState: GlobalStateService, private modalService: ModalService) { }

  ngOnInit(): void {

    this.globalState.currentThemeData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((themeData: ThemeData | undefined) => {
        // Do stuff
        console.log('themeData', themeData)
      });
  }
  close() {
    this.globalState.setShowModal(false);
  }
}
