import { TestBed } from '@angular/core/testing';

import { UnidadRegionalService } from './unidad-regional.service';

describe('UnidadRegionalService', () => {
  let service: UnidadRegionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadRegionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
