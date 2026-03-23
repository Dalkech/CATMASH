import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExempleComponent } from './exemple.component';
import { TestSetUp } from '../../tests/models/TestSetUp';

describe('ExempleComponent', () => {
  let component: ExempleComponent;
  let fixture: ComponentFixture<ExempleComponent>;

  TestSetUp.configureTestBed(ExempleComponent);

  beforeEach(async () => {
    fixture = TestBed.createComponent(ExempleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
