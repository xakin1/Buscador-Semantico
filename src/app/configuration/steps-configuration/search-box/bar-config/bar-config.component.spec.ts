import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarConfigComponent } from './bar-config.component';

describe('BarConfigComponent', () => {
  let component: BarConfigComponent;
  let fixture: ComponentFixture<BarConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
