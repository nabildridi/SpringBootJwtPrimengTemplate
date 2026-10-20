import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DaisyTable } from './daisy-table';

describe('DaisyTable', () => {
  let component: DaisyTable;
  let fixture: ComponentFixture<DaisyTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaisyTable],
    }).compileComponents();

    fixture = TestBed.createComponent(DaisyTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
