import { TestBed } from '@angular/core/testing';

import { ExamenesService } from './examenes.service';

describe('ExamenesService', () => {
  let service: ExamenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
