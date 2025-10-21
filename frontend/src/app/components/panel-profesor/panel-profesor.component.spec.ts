import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelProfesorComponent } from './panel-profesor.component';

describe('PanelProfesorComponent', () => {
  let component: PanelProfesorComponent;
  let fixture: ComponentFixture<PanelProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
