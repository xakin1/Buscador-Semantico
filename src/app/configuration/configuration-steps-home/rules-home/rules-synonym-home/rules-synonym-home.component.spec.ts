import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesSynonymHomeComponent } from './rules-synonym-home.component';

describe('RulesSynonymHomeComponent', () => {
  let component: RulesSynonymHomeComponent;
  let fixture: ComponentFixture<RulesSynonymHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesSynonymHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesSynonymHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
