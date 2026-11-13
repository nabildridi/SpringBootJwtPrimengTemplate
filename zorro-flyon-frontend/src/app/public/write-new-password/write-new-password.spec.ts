import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WriteNewPassword } from './write-new-password';

describe('WriteNewPassword', () => {
  let component: WriteNewPassword;
  let fixture: ComponentFixture<WriteNewPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteNewPassword],
    }).compileComponents();

    fixture = TestBed.createComponent(WriteNewPassword);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
