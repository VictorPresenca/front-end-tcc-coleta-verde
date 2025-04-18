import { TestBed } from '@angular/core/testing';

import { ColetaBackendService } from './coleta-backend.service';

describe('ColetaBackendService', () => {
  let service: ColetaBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColetaBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
