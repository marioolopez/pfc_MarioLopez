import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAlumnoComponent } from './panel-alumno.component';

describe('PanelAlumnoComponent', () => {
  let component: PanelAlumnoComponent;
  let fixture: ComponentFixture<PanelAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelAlumnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
