import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynonymsConfigurationComponent } from './synonyms-configuration.component';

describe('SynonymsConfigurationComponent', () => {
  let component: SynonymsConfigurationComponent;
  let fixture: ComponentFixture<SynonymsConfigurationComponent>;

  beforeEach(async(() => {
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
