import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilteredDropdown } from './filtered-dropdown';

describe('FilteredDropdown', () => {
  let component: FilteredDropdown;
  let fixture: ComponentFixture<FilteredDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredDropdown],
    }).compileComponents();

    fixture = TestBed.createComponent(FilteredDropdown);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
