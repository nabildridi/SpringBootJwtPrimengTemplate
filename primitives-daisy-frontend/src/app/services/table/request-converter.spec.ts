import { TestBed } from '@angular/core/testing';
import { RequestConverter } from './request-converter';

describe('RequestConverter', () => {
  let service: RequestConverter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestConverter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
