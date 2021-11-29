import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboBoxStepsComponent } from './combo-box-steps.component';

describe('ComboBoxStepsComponent', () => {
  let component: ComboBoxStepsComponent;
  let fixture: ComponentFixture<ComboBoxStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboBoxStepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboBoxStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
