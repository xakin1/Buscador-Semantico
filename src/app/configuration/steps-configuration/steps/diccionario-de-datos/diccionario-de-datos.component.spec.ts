import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DiccionarioDeDatosComponent } from './diccionario-de-datos.component';

describe('DiccionarioDeDatosComponent', () => {
  let component: DiccionarioDeDatosComponent;
  let fixture: ComponentFixture<DiccionarioDeDatosComponent>;

  beforeEach(waitForAsync(() => {
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
