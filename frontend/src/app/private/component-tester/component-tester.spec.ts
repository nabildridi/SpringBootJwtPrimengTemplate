import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentTester } from './component-tester';

describe('ComponentTester', () => {
  let component: ComponentTester;
  let fixture: ComponentFixture<ComponentTester>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentTester],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentTester);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
