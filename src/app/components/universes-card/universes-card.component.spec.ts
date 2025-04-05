import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversesCardComponent } from './universes-card.component';

describe('UniversesCardComponent', () => {
  let component: UniversesCardComponent;
  let fixture: ComponentFixture<UniversesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversesCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniversesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
