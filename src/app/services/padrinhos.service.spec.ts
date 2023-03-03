import { TestBed } from '@angular/core/testing';

import { PadrinhosService } from './padrinhos.service';

describe('PadrinhosService', () => {
  let service: PadrinhosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PadrinhosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
