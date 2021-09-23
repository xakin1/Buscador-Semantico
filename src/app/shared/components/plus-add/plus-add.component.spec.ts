import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusAddComponent } from './plus-add.component';

describe('PlusAddComponent', () => {
  let component: PlusAddComponent;
  let fixture: ComponentFixture<PlusAddComponent>;

  beforeEach(async(() => {
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
