import { TestBed } from '@angular/core/testing';

import { ExempleHttpClientService } from './exemple-http-client.service';
import { TestSetUp } from '../tests/models/TestSetUp';

describe('ExempleHttpClientService', () => {
  let service: ExempleHttpClientService;

  TestSetUp.configureTestBed(null);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExempleHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
