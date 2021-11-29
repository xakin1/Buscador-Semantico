import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommnandComponent } from './commnand.component';

describe('CommnandComponent', () => {
  let component: CommnandComponent;
  let fixture: ComponentFixture<CommnandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommnandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommnandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
