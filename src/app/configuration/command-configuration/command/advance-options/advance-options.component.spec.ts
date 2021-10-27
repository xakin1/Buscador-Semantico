import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdvanceOptionsComponentCommand } from './advance-options.component';

describe('AdvanceOptionsComponent', () => {
  let component: AdvanceOptionsComponentCommand;
  let fixture: ComponentFixture<AdvanceOptionsComponentCommand>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceOptionsComponentCommand ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceOptionsComponentCommand);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
