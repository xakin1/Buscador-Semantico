import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepConditionalComponent } from './step-conditional.component';

describe('StepConditionalComponent', () => {
  let component: StepConditionalComponent;
  let fixture: ComponentFixture<StepConditionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepConditionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepConditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
