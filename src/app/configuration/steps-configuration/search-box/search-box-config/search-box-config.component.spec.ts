import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBoxConfigComponent } from './search-box-config.component';

describe('SearchBoxConfigComponent', () => {
  let component: SearchBoxConfigComponent;
  let fixture: ComponentFixture<SearchBoxConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBoxConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
