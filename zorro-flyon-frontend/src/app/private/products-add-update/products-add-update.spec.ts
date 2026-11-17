import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsAddUpdate } from './products-add-update';

describe('ProductsAddUpdate', () => {
  let component: ProductsAddUpdate;
  let fixture: ComponentFixture<ProductsAddUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsAddUpdate]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsAddUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
