import { TestBed } from '@angular/core/testing';

import { MissionsComunicationService } from './missions-comunication.service';

describe('MissionsComunicationService', () => {
  let service: MissionsComunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissionsComunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
