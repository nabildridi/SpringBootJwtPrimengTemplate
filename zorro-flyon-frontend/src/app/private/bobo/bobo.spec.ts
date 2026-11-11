import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Bobo } from './bobo';

describe('Bobo', () => {
  let component: Bobo;
  let fixture: ComponentFixture<Bobo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bobo],
    }).compileComponents();

    fixture = TestBed.createComponent(Bobo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
