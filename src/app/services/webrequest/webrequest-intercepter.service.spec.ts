import { TestBed } from '@angular/core/testing';

import { WebrequestIntercepterService } from './webrequest-intercepter.service';

describe('WebrequestIntercepterService', () => {
  let service: WebrequestIntercepterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebrequestIntercepterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
