import { TestBed } from '@angular/core/testing';

import { LineaTransmisionService } from './linea-transmision.service';

describe('LineaTransmisionService', () => {
  let service: LineaTransmisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineaTransmisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
