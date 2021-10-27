import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComandosComponent } from './comandos.component';

describe('ComandosComponent', () => {
  let component: ComandosComponent;
  let fixture: ComponentFixture<ComandosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComandosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComandosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
