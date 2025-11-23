import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisResultadosComponent } from './mis-resultados.component';

describe('MisResultadosComponent', () => {
  let component: MisResultadosComponent;
  let fixture: ComponentFixture<MisResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisResultadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
