import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductStepFour } from './product-step-four';

describe('ProductStepFour', () => {
  let component: ProductStepFour;
  let fixture: ComponentFixture<ProductStepFour>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStepFour],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductStepFour);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
