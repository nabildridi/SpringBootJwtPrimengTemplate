import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PresentationTable } from './presentation-table';

describe('PresentationTable', () => {
  let component: PresentationTable;
  let fixture: ComponentFixture<PresentationTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentationTable],
    }).compileComponents();

    fixture = TestBed.createComponent(PresentationTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
