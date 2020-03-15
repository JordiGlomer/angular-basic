import { TestBed } from '@angular/core/testing';
import { EuropeanService } from './european.service';

describe('EuropeanConverterService', () => {
  let service: EuropeanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EuropeanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
