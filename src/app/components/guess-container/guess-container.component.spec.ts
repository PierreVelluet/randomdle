import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessContainerComponent } from './guess-container.component';

describe('GuessContainerComponent', () => {
  let component: GuessContainerComponent;
  let fixture: ComponentFixture<GuessContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuessContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
