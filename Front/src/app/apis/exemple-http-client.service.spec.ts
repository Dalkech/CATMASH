import { TestBed } from '@angular/core/testing';

import { ExempleHttpClientService } from './exemple-http-client.service';

describe('ExempleHttpClientService', () => {
  let service: ExempleHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExempleHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
