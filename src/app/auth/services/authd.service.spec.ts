import { TestBed } from '@angular/core/testing';

import { AuthdService } from './authd.service';

describe('AuthdService', () => {
  let service: AuthdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
