import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepConditionalTrueSelfComponent } from './step-conditional-true-self.component';

describe('StepConditionalTrueSelfComponent', () => {
  let component: StepConditionalTrueSelfComponent;
  let fixture: ComponentFixture<StepConditionalTrueSelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepConditionalTrueSelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepConditionalTrueSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
