import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HacerExamenComponent } from './hacer-examen.component';

describe('HacerExamenComponent', () => {
  let component: HacerExamenComponent;
  let fixture: ComponentFixture<HacerExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HacerExamenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HacerExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
