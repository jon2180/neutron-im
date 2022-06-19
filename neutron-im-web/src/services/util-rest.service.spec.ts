import { TestBed } from '@angular/core/testing';

import { UtilRestService } from './util-rest.service';

describe('UtilRestService', () => {
  let service: UtilRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
