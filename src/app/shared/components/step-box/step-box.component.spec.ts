import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepBoxComponent } from './step-box.component';

describe('StepBoxComponent', () => {
  let component: StepBoxComponent;
  let fixture: ComponentFixture<StepBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StepBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
