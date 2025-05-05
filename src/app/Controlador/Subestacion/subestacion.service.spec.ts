import { TestBed } from '@angular/core/testing';

import { SubestacionService } from './subestacion.service';

describe('SubestacionService', () => {
  let service: SubestacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubestacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
