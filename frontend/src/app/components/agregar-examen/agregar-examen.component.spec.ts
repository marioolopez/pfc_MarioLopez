import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarExamenComponent } from './agregar-examen.component';

describe('AgregarExamenComponent', () => {
  let component: AgregarExamenComponent;
  let fixture: ComponentFixture<AgregarExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarExamenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
