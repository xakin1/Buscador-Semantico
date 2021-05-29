import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleActiveRulesComponent } from './title-active-rules.component';

describe('TitleActiveRulesComponent', () => {
  let component: TitleActiveRulesComponent;
  let fixture: ComponentFixture<TitleActiveRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleActiveRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleActiveRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
