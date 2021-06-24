import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepBoxRightComponent } from './step-box-right.component';

describe('StepBoxRightComponent', () => {
  let component: StepBoxRightComponent;
  let fixture: ComponentFixture<StepBoxRightComponent>;

  beforeEach(async(() => {
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
