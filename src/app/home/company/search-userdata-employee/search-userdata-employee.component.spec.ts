import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUserdataEmployeeComponent } from './search-userdata-employee.component';

describe('SearchUserdataEmployeeComponent', () => {
  let component: SearchUserdataEmployeeComponent;
  let fixture: ComponentFixture<SearchUserdataEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchUserdataEmployeeComponent]
    });
    fixture = TestBed.createComponent(SearchUserdataEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
