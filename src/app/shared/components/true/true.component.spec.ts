import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueComponent } from './true.component';

describe('TrueComponent', () => {
  let component: TrueComponent;
  let fixture: ComponentFixture<TrueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
