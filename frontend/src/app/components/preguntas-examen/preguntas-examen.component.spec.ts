import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasExamenComponent } from './preguntas-examen.component';

describe('PreguntasExamenComponent', () => {
  let component: PreguntasExamenComponent;
  let fixture: ComponentFixture<PreguntasExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreguntasExamenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreguntasExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
