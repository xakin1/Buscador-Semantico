import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchBoxConfigComponent } from './search-box-config.component';

describe('SearchBoxConfigComponent', () => {
  let component: SearchBoxConfigComponent;
  let fixture: ComponentFixture<SearchBoxConfigComponent>;

  beforeEach(waitForAsync(() => {
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
