import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepConditionalFalseSelfComponent } from './step-conditional-false-self.component';

describe('StepConditionalFalseSelfComponent', () => {
  let component: StepConditionalFalseSelfComponent;
  let fixture: ComponentFixture<StepConditionalFalseSelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepConditionalFalseSelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepConditionalFalseSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
