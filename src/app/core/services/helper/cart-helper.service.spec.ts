import { TestBed } from '@angular/core/testing';

import { CartHelper } from './cart-helper.service';

describe('CartHelper', () => {
  let service: CartHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
