import { TestBed, inject } from '@angular/core/testing';

import { Tools } from './tools';

describe('Tools', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Tools]
    });
  });

  it('should ...', inject([Tools], (service: Tools) => {
    expect(service).toBeTruthy();
  }));
});
