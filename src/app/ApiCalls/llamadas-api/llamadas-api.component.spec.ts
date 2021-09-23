import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamadasApiComponent } from './llamadas-api.component';

describe('LlamadasApiComponent', () => {
  let component: LlamadasApiComponent;
  let fixture: ComponentFixture<LlamadasApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlamadasApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlamadasApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
