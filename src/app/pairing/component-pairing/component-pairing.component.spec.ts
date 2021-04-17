import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPairingComponent } from './component-pairing.component';

describe('ComponentPairingComponent', () => {
  let component: ComponentPairingComponent;
  let fixture: ComponentFixture<ComponentPairingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentPairingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentPairingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
