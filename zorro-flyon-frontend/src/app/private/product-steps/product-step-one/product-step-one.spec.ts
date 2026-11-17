import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductStepOne } from './product-step-one';

describe('ProductStepOne', () => {
  let component: ProductStepOne;
  let fixture: ComponentFixture<ProductStepOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStepOne],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductStepOne);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
