import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesContainerComponent } from './themes-container.component';

describe('ThemesContainerComponent', () => {
  let component: ThemesContainerComponent;
  let fixture: ComponentFixture<ThemesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemesContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThemesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
