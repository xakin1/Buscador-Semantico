import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SynonymsConfigurationComponent } from './synonyms-configuration.component';

describe('SynonymsConfigurationComponent', () => {
  let component: SynonymsConfigurationComponent;
  let fixture: ComponentFixture<SynonymsConfigurationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SynonymsConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynonymsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
