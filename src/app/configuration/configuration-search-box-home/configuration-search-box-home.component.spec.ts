import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationSearchBoxHomeComponent } from './configuration-search-box-home.component';

describe('ConfigurationSearchBoxHomeComponent', () => {
  let component: ConfigurationSearchBoxHomeComponent;
  let fixture: ComponentFixture<ConfigurationSearchBoxHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationSearchBoxHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationSearchBoxHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
