import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepBoxRightComponent } from './step-box-right.component';

describe('StepBoxRightComponent', () => {
  let component: StepBoxRightComponent;
  let fixture: ComponentFixture<StepBoxRightComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StepBoxRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepBoxRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
