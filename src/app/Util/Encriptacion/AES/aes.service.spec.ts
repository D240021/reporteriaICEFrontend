import { TestBed } from '@angular/core/testing';

import { AESService } from './aes.service';

describe('AESService', () => {
  let service: AESService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AESService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
