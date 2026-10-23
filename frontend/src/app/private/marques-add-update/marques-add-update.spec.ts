import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarquesAddUpdate } from './marques-add-update';

describe('MarquesAddUpdate', () => {
  let component: MarquesAddUpdate;
  let fixture: ComponentFixture<MarquesAddUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarquesAddUpdate],
    }).compileComponents();

    fixture = TestBed.createComponent(MarquesAddUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
