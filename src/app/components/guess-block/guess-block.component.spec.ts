import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessBlockComponent } from './guess-block.component';

describe('GuessBlockComponent', () => {
  let component: GuessBlockComponent;
  let fixture: ComponentFixture<GuessBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuessBlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuessBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
