import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonSelect } from './button-select';

describe('ButtonSelect', () => {
  let component: ButtonSelect;
  let fixture: ComponentFixture<ButtonSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
