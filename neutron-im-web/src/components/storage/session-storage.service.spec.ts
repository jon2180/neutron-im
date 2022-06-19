import { TestBed } from '@angular/core/testing';

import { SessionStorage } from './session-storage.service';

describe('SessionStorageServiceService', () => {
  let service: SessionStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
