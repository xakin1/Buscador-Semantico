import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsConfigurationComponent } from './steps-configuration.component';

describe('StepsConfigurationComponent', () => {
  let component: StepsConfigurationComponent;
  let fixture: ComponentFixture<StepsConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepsConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
