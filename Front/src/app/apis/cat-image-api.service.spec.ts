import { TestBed } from '@angular/core/testing';

import { CatImageApiService } from './cat-image-api.service';
import { TestSetUp } from '../tests/models/TestSetUp';
import { HttpTestingController } from '@angular/common/http/testing';
import { CatImage } from '../models/dtos/catImage';

describe('CatImageApiService', () => {
  let service: CatImageApiService;
  let httpMock: HttpTestingController;

  TestSetUp.configureTestBed();

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatImageApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch cat images', () => {
    const mockImages: CatImage[] = [{ id: '1', url: 'cat1.jpg' }, { id: '2', url: 'cat2.jpg', score: 10 }];

    service.getAll().subscribe(images => {
      expect(images).toEqual(mockImages);
    });
    const req = httpMock.expectOne('api/catimages'); // Adjust URL if needed
    expect(req.request.method).toBe('GET');
    req.flush(mockImages);
  });

  it('should fetch one cat image with Id', () => {
    const mockImage: CatImage = { id: '1', url: 'cat1.jpg' };

    service.getById('1').subscribe(image => {
      expect(image).toEqual(mockImage);
    });
    const req = httpMock.expectOne('api/catimages/1'); // Adjust URL if needed
    expect(req.request.method).toBe('GET');
    req.flush(mockImage);
  });
});
