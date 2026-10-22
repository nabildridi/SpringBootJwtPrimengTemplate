import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StepperTester } from './stepper-tester';

describe('StepperTester', () => {
  let component: StepperTester;
  let fixture: ComponentFixture<StepperTester>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperTester],
    }).compileComponents();

    fixture = TestBed.createComponent(StepperTester);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
