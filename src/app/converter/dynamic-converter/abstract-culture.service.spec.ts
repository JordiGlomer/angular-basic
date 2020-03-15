import { TestBed } from '@angular/core/testing';
import { AbstractCultureService } from './abstract-culture.service';

describe('AbstractCultureConverterService', () => {
  let service: AbstractCultureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractCultureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
