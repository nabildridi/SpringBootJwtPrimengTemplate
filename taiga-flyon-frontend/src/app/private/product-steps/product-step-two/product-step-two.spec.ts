import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductStepTwo } from './product-step-two';

describe('ProductStepTwo', () => {
  let component: ProductStepTwo;
  let fixture: ComponentFixture<ProductStepTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductStepTwo],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductStepTwo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
