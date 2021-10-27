import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlusAddComponent } from './plus-add.component';

describe('PlusAddComponent', () => {
  let component: PlusAddComponent;
  let fixture: ComponentFixture<PlusAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlusAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlusAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
