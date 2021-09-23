import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboBoxIdiomaComponent } from './combo-box-idioma.component';

describe('ComboBoxIdiomaComponent', () => {
  let component: ComboBoxIdiomaComponent;
  let fixture: ComponentFixture<ComboBoxIdiomaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboBoxIdiomaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboBoxIdiomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
