import { ComponentFixture, TestBed } from '@angular/core/testing';

import LoadingService, { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loadingService: LoadingService; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loadingService = TestBed.inject(LoadingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should show loader', () => {
    loadingService.show();
    expect(loadingService.loading()).toBe(true);
  });

  it('should hide loader', () => {
    loadingService.show();
    loadingService.hide();
    expect(loadingService.loading()).toBe(false);
  });

});
