import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPulsingPlaceholderComponent } from './app-pulsing-placeholder.component';
import { TestSetUp } from '../../tests/models/TestSetUp';

describe('AppPulsingPlaceholderComponent', () => {
  let component: AppPulsingPlaceholderComponent;
  let fixture: ComponentFixture<AppPulsingPlaceholderComponent>;

  TestSetUp.configureTestBed(AppPulsingPlaceholderComponent);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPulsingPlaceholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPulsingPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
