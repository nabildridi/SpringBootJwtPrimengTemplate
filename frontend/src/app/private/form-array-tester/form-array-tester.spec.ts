import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArrayTester } from './form-array-tester';

describe('FormArrayTester', () => {
  let component: FormArrayTester;
  let fixture: ComponentFixture<FormArrayTester>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormArrayTester],
    }).compileComponents();

    fixture = TestBed.createComponent(FormArrayTester);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
