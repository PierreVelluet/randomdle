import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndPanelComponent } from './end-panel.component';

describe('EndPanelComponent', () => {
  let component: EndPanelComponent;
  let fixture: ComponentFixture<EndPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
