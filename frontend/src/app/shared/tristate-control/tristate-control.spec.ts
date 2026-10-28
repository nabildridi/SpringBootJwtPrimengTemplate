import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TristateControl } from './tristate-control';

describe('TristateControl', () => {
  let component: TristateControl;
  let fixture: ComponentFixture<TristateControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TristateControl],
    }).compileComponents();

    fixture = TestBed.createComponent(TristateControl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
