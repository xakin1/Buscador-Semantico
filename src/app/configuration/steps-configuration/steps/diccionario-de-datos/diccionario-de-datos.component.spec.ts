import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiccionarioDeDatosComponent } from './diccionario-de-datos.component';

describe('DiccionarioDeDatosComponent', () => {
  let component: DiccionarioDeDatosComponent;
  let fixture: ComponentFixture<DiccionarioDeDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiccionarioDeDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiccionarioDeDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
