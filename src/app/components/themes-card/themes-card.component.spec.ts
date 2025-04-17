import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesCardComponent } from './themes-card.component';

describe('ThemesCardComponent', () => {
  let component: ThemesCardComponent;
  let fixture: ComponentFixture<ThemesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemesCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
