import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceOptionsComponentSteps } from './advance-options.component';

describe('AdvanceOptionsComponent', () => {
  let component: AdvanceOptionsComponentSteps;
  let fixture: ComponentFixture<AdvanceOptionsComponentSteps>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceOptionsComponentSteps ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceOptionsComponentSteps);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
