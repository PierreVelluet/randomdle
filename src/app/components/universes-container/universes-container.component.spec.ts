import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversesContainerComponent } from './universes-container.component';

describe('UniversesContainerComponent', () => {
  let component: UniversesContainerComponent;
  let fixture: ComponentFixture<UniversesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversesContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniversesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
