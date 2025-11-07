import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUsersByAdminComponent } from './search-users-by-admin.component';

describe('SearchUsersByAdminComponent', () => {
  let component: SearchUsersByAdminComponent;
  let fixture: ComponentFixture<SearchUsersByAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchUsersByAdminComponent]
    });
    fixture = TestBed.createComponent(SearchUsersByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
