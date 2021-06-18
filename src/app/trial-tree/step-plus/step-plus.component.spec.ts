import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepPlusComponent } from './step-plus.component';

describe('StepPlusComponent', () => {
  let component: StepPlusComponent;
  let fixture: ComponentFixture<StepPlusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepPlusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
