import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceiveSendModal } from './receive-send-modal';

describe('ReceiveSendModal', () => {
  let component: ReceiveSendModal;
  let fixture: ComponentFixture<ReceiveSendModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiveSendModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceiveSendModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
