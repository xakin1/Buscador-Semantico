import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialTreeComponent } from './trial-tree.component';

describe('TrialTreeComponent', () => {
  let component: TrialTreeComponent;
  let fixture: ComponentFixture<TrialTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrialTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrialTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
