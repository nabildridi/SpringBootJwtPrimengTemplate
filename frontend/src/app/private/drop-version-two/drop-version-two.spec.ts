import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropVersionTwo } from './drop-version-two';

describe('DropVersionTwo', () => {
  let component: DropVersionTwo;
  let fixture: ComponentFixture<DropVersionTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropVersionTwo],
    }).compileComponents();

    fixture = TestBed.createComponent(DropVersionTwo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
