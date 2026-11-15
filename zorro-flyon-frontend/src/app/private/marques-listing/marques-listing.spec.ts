import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarquesListing } from './marques-listing';

describe('MarquesListing', () => {
  let component: MarquesListing;
  let fixture: ComponentFixture<MarquesListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarquesListing],
    }).compileComponents();

    fixture = TestBed.createComponent(MarquesListing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
