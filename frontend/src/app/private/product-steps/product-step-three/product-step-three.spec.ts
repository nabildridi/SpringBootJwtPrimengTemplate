import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductStepThree } from './product-step-three';

describe('ProductStepThree', () => {
  let component: ProductStepThree;
  let fixture: ComponentFixture<ProductStepThree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStepThree],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductStepThree);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
