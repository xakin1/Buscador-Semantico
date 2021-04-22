import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationStepsHomeComponent } from './configuration-steps-home.component';

describe('ConfigurationStepsHomeComponent', () => {
  let component: ConfigurationStepsHomeComponent;
  let fixture: ComponentFixture<ConfigurationStepsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationStepsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationStepsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
