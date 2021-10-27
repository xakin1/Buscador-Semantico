import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrueComponent } from './true.component';

describe('TrueComponent', () => {
  let component: TrueComponent;
  let fixture: ComponentFixture<TrueComponent>;

  beforeEach(waitForAsync(() => {
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
